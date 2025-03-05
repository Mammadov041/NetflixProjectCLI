import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import SearchStack from './SearchStack';
import HomeIcon from '../../assets/icons/home.svg'; // Import SVG file
import SearchIcon from '../../assets/icons/search.svg';
import ProfileIcon from '../../assets/icons/profile.svg';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'red', // Active icon color
        tabBarInactiveTintColor: 'gray', // Inactive icon color
        tabBarStyle: {backgroundColor: 'black', paddingBottom: 5}, // Tab bar background
        tabBarIcon: ({color}) => {
          let IconComponent;

          if (route.name === 'HomeTab') {
            IconComponent = HomeIcon;
          } else if (route.name === 'SearchTab') {
            IconComponent = SearchIcon;
          } else if (route.name === 'ProfileTab') {
            IconComponent = ProfileIcon;
          }

          return IconComponent ? (
            <IconComponent width={25} height={25} fill={color || 'white'} />
          ) : null;
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{tabBarLabel: 'Search'}}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
