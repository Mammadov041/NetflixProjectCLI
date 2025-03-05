import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';

const People = ({title, list}) => {
  const navigation = useNavigation();
  const handleNavigateToDetail = id => {
    navigation.navigate('PersonDetails', {
      id: id,
    });
  };
  return (
    <View className="mb-6">
      <Text className="text-2xl mb-2 text-white font-montSerrat">{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {list.map(item => (
          <View className="mr-2 w-[115px] h-[165px] rounded-lg overflow-hidden">
            <Image
              source={{
                uri:
                  item.profile_path != null
                    ? `https://image.tmdb.org/t/p/original${item.profile_path}`
                    : 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg',
              }}
              className="w-full h-full rounded-md"
              resizeMode="cover"
            />
            <Text className="font-montSerrat">
              {item.name} {item.surname}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default People;
