import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import pokemon from 'pokemontcgsdk';

pokemon.configure({ apiKey: process.env.POKEMON_API_KEY });

// Displays card details (stats, market price, etc.)
// Navigates from card in Collection or Search screens
export default function CardDetails({ route }) {
  const { cardId } = route.params;
  const [card, setCard] = React.useState(null);

  // Fetch info using Pokemon TCG API
  const getCardInfo = async (cardId) => {
    try {
      if (!cardId) {
        // If no cardId is provided, return null
        return null;
      }
      const card = await pokemon.card.find(cardId);
      return card;
    } catch (error) {
      console.error('Error fetching card details:', error);
      return null;
    }
  }

  useEffect(() => {
    const fetchCardInfo = async () => {
      const cardInfo = await getCardInfo(cardId);
      setCard(cardInfo);
    };

    fetchCardInfo();
  }, [cardId]);

  // TODO - loading indicator and error
  if (!card) {
    return (
      <View>
        <Text>No card information available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: card.images.large }} style={styles.cardImage} />
      <Text style={styles.title}>{card.name}</Text>
      <ScrollView>
        <View style={styles.detailContainer}>
          {/* number, rarity, type, hp, stage, text, attack1, attack2, weakness, resistance, retreat cost, artist, market price history */}
          {Object.entries(card).map(([key, value]) => (
          <View key={key} style={styles.detailRow}>
            <Text style={styles.key}>{key}:</Text>
            <Text style={styles.value}>
              {typeof value === 'object' ? JSON.stringify(value, null, 2) : value.toString()}
            </Text>
          </View>
        ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cardImage: {
    width: 200,
    height: 300,
    alignSelf: 'center',
    marginBottom: 20,
  },
  detailContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: 'lightgray',
  },
  keyContainer: {
    padding: 10,
    borderRadius: 5,
  },
  valueContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  key: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    flex: 1,
    flexWrap: 'wrap',
  },
});