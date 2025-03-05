import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import SearchInput from '../../common/SearchInput';
import People from '../../common/People';
import HeaderAndMoviesTvShows from '../../common/HeaderAndMoviesTvShows';
import {searchMoviesAsync} from '../../api/movieApi';
import {useMMKVString} from 'react-native-mmkv';
import {searchTvShowsAsync} from '../../api/tvShowApi';
import {searchPeopleAsync} from '../../api/personApi';

const Search = () => {
  const [search, setSearch] = useState('A');
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [people, setPeople] = useState([]);
  const [token, setToken] = useMMKVString('token');

  const getMoviesByQuery = async () => {
    const movies_ = await searchMoviesAsync(search, token);
    setMovies(movies_);
  };

  const getTVShowsByQuery = async () => {
    const tvShows_ = await searchTvShowsAsync(search, token);
    setTvShows(tvShows_);
  };

  const getArtistsByQuery = async () => {
    const artists = await searchPeopleAsync(search, token);
    setPeople(artists);
  };

  const searchOnClick = async () => {
    await getMoviesByQuery();
    await getTVShowsByQuery();
    await getArtistsByQuery();
  };

  return (
    <ScrollView className="p-5 bg-black ">
      <View className="gap-8">
        <SearchInput
          search={searchOnClick}
          placeholder="Search for shows,movies or artists..."
          onChangeText={text => setSearch(text)}
        />
        <People title="Artists" list={people} />
        <HeaderAndMoviesTvShows list={movies} title="Movies" />
        <HeaderAndMoviesTvShows list={tvShows} title="TV Shows" />
      </View>
    </ScrollView>
  );
};

export default Search;
