import { View, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import Card from '../components/Card';

// hardcoded data
const cards = [
  { id: '1', title: 'Card 1', image: require('../assets/card.png'), cardId: 'xy1-42' },
  { id: '2', title: 'Card 2', image: require('../assets/card.png'), cardId: 'xy1-42' },
  { id: '3', title: 'Card 3', image: require('../assets/card.png'), cardId: 'xy1-42' },
  { id: '4', title: 'Card 4', image: require('../assets/card.png'), cardId: 'xy1-42' },
  { id: '5', title: 'Card 5', image: require('../assets/card.png'), cardId: 'xy1-42' },
  { id: '6', title: 'Card 6', image: require('../assets/card.png'), cardId: 'xy1-42' },
  { id: '7', title: 'Card 7', image: require('../assets/card.png'), cardId: 'xy1-42' },
  { id: '8', title: 'Card 8', image: require('../assets/card.png'), cardId: 'xy1-42' },
  { id: '9', title: 'Card 9', image: require('../assets/card.png'), cardId: 'xy1-42' },
  { id: '10', title: 'Card 10', image: require('../assets/card.png'), cardId: 'xy1-42' },
]

export default function Collection({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        // TODO: replace with user data
        data={cards}
        renderItem={({ item }) => (
          <Card
            cardImage={item.image}
            cardName={item.title}
            navigation={navigation}
            cardId={item.cardId}
          />
        )}
        numColumns={3}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
});