import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ChevronLeft from '../../../assets/icons/chevronLeft.svg';

const Header = () => {
  const navigation = useNavigation();
  const routes = navigation.getState().routes;
  const currentRouteName = routes[routes.length - 1].name;

  if (navigation.canGoBack()) {
    return (
      <View className="items-center py-3 bg-black">
        <TouchableOpacity
          className="absolute left-2 top-3 "
          hitSlop={10}
          onPress={() => navigation.goBack()}>
          <ChevronLeft width={30} />
        </TouchableOpacity>
        <Text className="mb-8"> </Text>
      </View>
    );
  }
};

export default Header;
