import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';

const HistoryDetail = () => {
  const route = useRoute();
  const {item} = route.params;

  // Format the createdAt date string
  const formatDateTime = dateString => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toISOString().split('T')[1].slice(0, 5);
    return `${formattedTime}  ${formattedDate}`;
  };

  return (
    <View className="p-5 bg-black gap-7 ">
      <Text className="font-montSerratBold text-4xl text-white self-center">
        History Detailed Info
      </Text>
      <View className="self-center ">
        <Image
          source={{uri: `https://image.tmdb.org/t/p/original${item.image}`}}
          height={450}
          width={Dimensions.get('window').width}
        />
        <Text className="font-montSerrat text-white text-2xl p-3">
          {item.searchType === 'person' ? 'Name : ' : 'Title : '} {item.title}
        </Text>
        <Text className="text-white text-lg p-3 font-montSerratBold">
          Created At {formatDateTime(item.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default HistoryDetail;
