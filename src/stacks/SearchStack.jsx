import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from '../screens/search/Search';
import MovieDetails from '../screens/movieDetails/MovieDetails';
import Header from './components/Header';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => <Header />}}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
};

export default SearchStack;
