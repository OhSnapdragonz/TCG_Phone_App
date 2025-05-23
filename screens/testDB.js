import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connectToDatabase } from '../backend/initDB';
import { getCard, insertCardIntoTable, populateTables } from '../backend/dbMethods';

const IP = Constants.expoConfig.extra.IP_ADDRESS;

fetch(`http://${IP}:8000/card/swsh4-25`)
  .then(res => res.json())
  .then(data => console.log(data))

const DatabaseTestScreen = () => {
  useEffect(() => {
    const runTest = async () => {
      const db = connectToDatabase();
      const cards = ['swsh4-25', 'xy1-1', 'xyp-XY27', 'xyp-XY25', 'sm35-1', 'ex9-1', 'ex9-86'];

      for (var id = 0; id < cards.length; id++) {
        console.log(`id: ${id}`)
        console.log(`Fetching card: ${cards[id]}`);      
        await populateTables(cards[id], db);
        console.log(`Inserted card: ${cards[id]}`);
      }
      console.log("✅ All cards processed");
    };

    runTest();
  }, []);

  return (
    <View>
      <Text>Populating DB… check console logs.</Text>
    </View>
  );
};

export default DatabaseTestScreen;