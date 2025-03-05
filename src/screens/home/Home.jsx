import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';

import MainMovie from './components/MainMovie';
import {getTrendingMoviesAsync} from '../../api/movieApi';
import {getTrendingTvShowsAsync} from '../../api/tvShowApi';
import HeaderAndMoviesTvShows from '../../common/HeaderAndMoviesTvShows';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const setTrendingMoviesAsync = async () => {
    try {
      const trending_movies = await getTrendingMoviesAsync();
      setTrendingMovies(trending_movies.content);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  const setPopularTvShowsAsync = async () => {
    try {
      const popular_tv_shows = await getTrendingTvShowsAsync();
      setPopularTvShows(popular_tv_shows.content);
    } catch (error) {
      console.error('Error fetching popular tv shows:', error);
    }
  };

  useEffect(() => {
    setTrendingMoviesAsync();
    setPopularTvShowsAsync();
  }, []);
  return (
    <ScrollView className="bg-black">
      <View className="p-5">
        <MainMovie />
        <HeaderAndMoviesTvShows title="Trending Movies" list={trendingMovies} />
        <HeaderAndMoviesTvShows
          title="Popular TV Shows"
          list={popularTvShows}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
