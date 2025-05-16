import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'

// Displays trading card name and image as icon (for Collection screen)
// Navigates to Details screen when pressed
export default function Card({ cardImage, cardName, cardId, navigation }) {
  return (
    <Pressable
      onPress={() => navigation.navigate('Details', { cardId })}
      style={styles.cardContainer}
    >
      <View style={styles.cardImage}>
        <Image source={cardImage} resizeMode="cover" style={styles.image} />
      </View>
      <Text style={styles.cardName}>
        {cardName}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 5,
    height: 195,
    width: 110,
    marginHorizontal: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardImage: {
    width: 100,
    height: 150,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardName: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});