import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useCallback, useEffect, useState } from 'react';

// Screen imports
import AddCard from './screens/AddCard';
import SearchCard from './screens/SearchCard';
import Collection from './screens/Collection';
import CardDetails from './screens/CardDetails';

const CollectionStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function CollectionScreensStack() {
  return (
    <CollectionStack.Navigator initialRouteName="My Collection">
      <CollectionStack.Screen
        name="My Collection"
        component={Collection}
      />
      <CollectionStack.Screen
        name="Details"
        component={CardDetails}
        options={{ title: 'Card Details' }}
      />
    </CollectionStack.Navigator>
  );
}

function SearchScreensStack() {
  return (
    <SearchStack.Navigator initialRouteName="Search Card">
      <SearchStack.Screen
        name="Search Card"
        component={SearchCard}
      />
      <SearchStack.Screen
        name="Details"
        component={CardDetails}
        options={{ title: 'Card Details' }}
      />
    </SearchStack.Navigator>
  );
}

export default function App() {
  return (  
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Collection"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Collection':
              return <Feather name="grid" size={size} color={color} />;
            case 'Add':
              return <Feather name="plus-circle" size={size} color={color} />;
            case 'Search':
              return <Feather name="search" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Collection"
        component={CollectionScreensStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add"
        component={AddCard}
        options={{ title: 'Add a Card' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreensStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}