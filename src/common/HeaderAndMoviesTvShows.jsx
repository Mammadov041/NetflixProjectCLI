import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';

const HeaderAndMoviesTvShows = ({title, list}) => {
  const navigation = useNavigation();

  const handleNavigateToDetail = (id, media_type) => {
    navigation.navigate('MovieDetails', {
      id: id,
      media_type: media_type,
    });
  };

  const handleNavigateToHistoryDetail = item => {
    navigation.navigate('HistoryDetail', {
      item: item,
    });
  };

  return (
    <View className="mb-6">
      <Text className="text-2xl mb-2 text-white font-montSerrat">{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {list?.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={
              item.image == null
                ? () => handleNavigateToDetail(item.id, item.media_type)
                : () => handleNavigateToHistoryDetail(item)
            }>
            <View className="mr-2 w-[115px] h-[165px] rounded-lg overflow-hidden">
              <Image
                source={{
                  uri:
                    item.poster_path != null
                      ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                      : item.image != null
                      ? `https://image.tmdb.org/t/p/original${item.image}`
                      : 'https://i.pinimg.com/736x/83/e5/04/83e504d41bffdcdebfc8e3dad72e887f.jpg',
                }}
                className="w-full h-full rounded-md"
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HeaderAndMoviesTvShows;
