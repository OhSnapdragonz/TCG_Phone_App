import { connectToDatabase } from "./initDB";
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.API_URL;
const apiKey = Constants.expoConfig.extra.API_KEY;

const db = connectToDatabase()


export const getCard = async (id) => {
    /**
     * Fetches the card from the tcg api and returns a json dict containing
     * the card information
     * @param id: The card's id
     * return card: The json dict containing the card information
     */

    try {
    const response = await fetch(`${apiUrl}${id}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    const cardInfo = await response.json();

    if (response.ok) {
      console.log(
        `Success ${response.status}! Retrieved info for card -> ${cardInfo.data.id}: ${cardInfo.data.name}`
      );
      return cardInfo;
    } else {
      console.error(`Error: ${response.status}`, cardInfo);
      return null;
    }
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
};


////////////////////////////////////////////////////// Data Extraction Functions //////////////////////////////////////////////////

export const extractCardTableData = (card) => {
  const cardData = card.data;

  const cardId = cardData.id;
  const name = cardData.name;
  const supertype = cardData.supertype;
  const subtypes = (cardData.subtypes || []).join(', ');
  const setName = cardData.set.name;
  const rarity = cardData.rarity || 'Unknown';
  const imageUrl = cardData.images.small;
  const url = cardData.tcgplayer?.url || ''; // Safe fallback

  return [
    cardId,
    name,
    supertype,
    subtypes,
    setName,
    rarity,
    imageUrl,
    url,
  ];
};

////////////////////////////////////////////////////////// Insert Functions ///////////////////////////////////////////////////////

export const insertCardIntoTable = async (card, db) => {
  const cardData = extractCardTableData(card);

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT count FROM Card WHERE id = ?',
        [cardData[0]],
        (_, { rows }) => {
          if (rows.length > 0) {
            const newCount = rows.item(0).count + 1;
            tx.executeSql(
              'UPDATE Card SET count = ? WHERE id = ?',
              [newCount, cardData[0]],
              () => resolve(), // <- success
              (_, error) => reject(error) // <- error on update
            );
          } else {
            tx.executeSql(
              `INSERT INTO Card (id, name, supertype, subtype, set_name, rarity, image_url, url, count)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
              cardData,
              () => resolve(), // <- success
              (_, error) => reject(error) // <- error on insert
            );
          }
        },
        (_, error) => reject(error) // <- error on SELECT
      );
    });
  });
};

export const populateTables = async (id, db) => {
    const card = await getCard(id)
    if (card) {
        await insertCardIntoTable(card, db)
        console.log(`Successfully inserted data for card ${id}`)
    } else {
    console.log(`❌ Card not found or failed to fetch: ${id}`);
  }
}
