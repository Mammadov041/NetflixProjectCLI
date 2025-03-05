import React, {useEffect, useState} from 'react';
import {View, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {getTrendingMoviesAsync} from '../../../api/movieApi';
import Button from '../../../common/Button';

const MainMovie = () => {
  const [imgSrc, setImgSrc] = useState('');

  const getFirstTrendingMovie = async () => {
    try {
      const trendingMovies = await getTrendingMoviesAsync();
      if (trendingMovies.content.length > 0) {
        setImgSrc(trendingMovies.content[0].poster_path);
      }
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  useEffect(() => {
    getFirstTrendingMovie();
  }, []);

  return (
    <View className="w-full h-[500px] rounded-md overflow-hidden mb-4">
      <ImageBackground
        source={{
          uri: imgSrc ? 'https://image.tmdb.org/t/p/original' + imgSrc : null,
        }}
        className="w-full h-full h justify-end items-center">
        <View className="gap-2 flex-row py-5">
          <TouchableOpacity
            className={
              'bg-white rounded-sm text-center self-center w-[165px] justify-center items-center p-3'
            }
            onPress={() => {}}>
            <Text className="font-montSerratBold text-black">Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              'bg-gray-500 rounded-sm text-center self-center w-[165px] justify-center items-center p-3'
            }
            onPress={() => {}}>
            <Text className="font-montSerratBold text-white">More Info</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MainMovie;
