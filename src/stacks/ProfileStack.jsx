import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/profile/Profile';
import HistoryDetail from '../screens/profile/HistoryDetail';
import Header from './components/Header';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => <Header />}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
