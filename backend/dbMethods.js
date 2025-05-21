import { connectToDatabase } from "./initDB";
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.API_URL;
const apiKey = Constants.expoConfig.extra.API_KEY;

const db = connectToDatabase()


export const getCard = (id) => {
    /**
     * Fetches the card from the tcg api and returns a json dict containing
     * the card information
     * @param id: The card's id
     * return card: The json dict containing the card information
     */

}

////////////////////////////////////////////////////////// Insert Functions ///////////////////////////////////////////////////////

export const insertIntoCardTable = (card) => {
  const {
    id,
    name,
    supertype,
    subtype,
    set_name,
    rarity,
    image_url,
    url,
  } = card;

  db.transaction(tx => {
    // First, check if the card already exists
    tx.executeSql(
      'SELECT count FROM Card WHERE id = ?',
      [id],
      (_, { rows }) => {
        if (rows.length > 0) {
          const newCount = rows._array[0].count + 1;
          // Update the count
          tx.executeSql(
            'UPDATE Card SET count = ? WHERE id = ?',
            [newCount, id]
          );
        } else {
          // Insert new card
          tx.executeSql(
            `INSERT INTO Card (id, name, supertype, subtype, set_name, rarity, image_url, url, count)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
            [id, name, supertype, subtype, set_name, rarity, image_url, url]
          );
        }
      },
      (txObj, error) => {
        console.error('Failed to insert or update card:', error);
        return false;
      }
    );
  });
};

