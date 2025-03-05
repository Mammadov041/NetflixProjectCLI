import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Help = () => {
  const navigation = useNavigation();
  const netflixLogo = require('../../../assets/images/netflixLogo.png');

  return (
    <View className="flex-1 bg-black items-center justify-center p-5">
      <Image source={netflixLogo} resizeMode="contain" className="h-12 mb-5" />
      <Text className="text-white text-3xl font-montSerratBold">
        Help & Support
      </Text>
      <Text className="text-gray-300 text-center mt-3 px-5 font-montSerrat">
        Need assistance? Find answers to common questions or contact our support
        team.
      </Text>

      <TouchableOpacity
        className="bg-red-600 px-5 py-2 rounded-full mt-5"
        onPress={() => navigation.goBack()}>
        <Text className="text-white text-lg font-montSerratBold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Help;
