import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import pokemon from 'pokemontcgsdk';
import Card from '../components/Card';

pokemon.configure({ apiKey: process.env.POKEMON_API_KEY });

export default function SearchCard({ navigation }) {
  const [cardNameQuery, setCardNameQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: add more search functions 
  // Handle searching for cards by name using Pokemon TCG API
  const searchByName = async (name) => {
    try {
      if (!name) {
        // If clearing search results if no input
        // setSearchResults([]);
        return;
      }
      const query = `name:"${name}"`;
      const response = await pokemon.card.where({ q: query });
      if (response && response.count > 0) {
        setSearchResults(response.data);
        for (let i = 0; i < response.data.length; i++) {
          const card = response.data[i];
          console.log('Card:', card.name, card.id);
        }
        setError(null);
      } else {
        setError('No cards found with that name.');
      }
    } catch (error) {
      console.error('Error fetching card details:', error);
      setError('An error occurred while fetching card details.');
    }
  }

  return (
    <View style={styles.container}>

      {/* Input to search card by name */}
      <View style={styles.searchContainer}>
        <Text style={styles.label}>Search for a card by name:</Text>
        <View style={styles.searchBar}>
          <Feather name="search" size={24} color="black" />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter card name"
            value={cardNameQuery}
            onChangeText={setCardNameQuery}

            // TODO: loading indicator
            onSubmitEditing={() => {
              setLoading(true);
              searchByName(cardNameQuery);
              setLoading(false);
            }}
          />
        </View>
      </View>

      {/* Error message */}
      {error && (
        <View style={[styles.searchContainer, styles.errorMessage]}>
          <Feather name="alert-circle" size={24} color="red" />
          <Text style={{ color: 'red', marginLeft: 10 }}>{error}</Text>
        </View>
      )}

      {/* Display search results */}
      {searchResults.length > 0 && (
        <View style={styles.searchResultsContainer}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <Card
                cardImage={{ uri: item.images.small }}
                cardName={item.name}
                cardId={item.id}
                navigation={navigation}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  searchResultsContainer: {
    alignItems: 'center',
  },
  errorMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
    borderColor: '#ffcccc',
    borderWidth: 1,
    borderRadius: 8,
  }
});