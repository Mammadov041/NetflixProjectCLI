import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  getMovieDetailsByIdAsync,
  getMovieTrailersByIdAsync,
  getSimilarMoviesByIdAsync,
} from '../../api/movieApi';
import {
  getSimilarTvShowsByIdAsync,
  getTvShowDetailsByIdAsync,
  getTvShowTrailersByIdAsync,
} from '../../api/tvShowApi';
import {useMMKVString} from 'react-native-mmkv';
import HeaderAndMoviesTvShows from '../../common/HeaderAndMoviesTvShows';

const MovieDetails = () => {
  const route = useRoute();
  const {id, media_type} = route.params;

  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState('');
  const [loading, setLoading] = useState(true);
  const [token] = useMMKVString('token');
  const [similars, setSimilars] = useState([]);
  // const [backdropImg, setBackdropImg] = useState('');

  const similarsAsync = async () => {
    const similarss =
      media_type === 'movie'
        ? await getSimilarMoviesByIdAsync(id, token)
        : await getSimilarTvShowsByIdAsync(id, token);
    setSimilars(similarss.similar);
  };

  // useEffect(() => {
  //   setBackdropImg(movie.backdrop_path);
  // }, [movie]);

  const setDetailsAsync = useCallback(async () => {
    try {
      setLoading(true);
      const response =
        media_type === 'movie'
          ? await getMovieDetailsByIdAsync(id)
          : await getTvShowDetailsByIdAsync(id);
      setMovie(response.content);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  }, [id, media_type]);

  const getTrailerAsync = useCallback(async () => {
    try {
      const response =
        media_type === 'movie'
          ? await getMovieTrailersByIdAsync(id, token)
          : await getTvShowTrailersByIdAsync(id, token);

      if (response.trailers) {
        setTrailer(response.trailers[0]?.key); // Get YouTube video key
      }
    } catch (error) {
      console.error('Error fetching movie trailers:', error);
    }
  }, [id, media_type, token]);

  useEffect(() => {
    setDetailsAsync();
    getTrailerAsync();
    similarsAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="white" />;
  }

  return (
    <ScrollView className="flex-1 bg-black ">
      {/* <Image
        className="w-full h-[220px]"
        source={{
          uri: `https://image.tmdb.org/t/p/original${backdropImg}`,
        }}
      /> */}
      {/* Embed YouTube Trailer */}
      {trailer != null ? (
        <View className="w-full">
          <YoutubePlayer height={200} videoId={trailer} />
        </View>
      ) : (
        <Text className="p-5 text-white font-montSerratBold text-2xl">
          Oops no trailer available ...
        </Text>
      )}
      <View className="gap-3 p-5">
        <Text className="text-white font-montSerratBold text-4xl">
          {media_type === 'movie'
            ? movie?.title
            : movie?.name || movie?.original_name}
        </Text>
        <ScrollView horizontal>
          <View className="flex-row gap-3 mb-5">
            {movie?.genres?.map((genre, index) => (
              <Text
                key={index}
                className="text-white text-lg p-3 bg-[#5c5c5c] rounded-md">
                {genre.name}
              </Text>
            ))}
          </View>
        </ScrollView>
        <Text className="font-montSerrat text-white leading-7 mb-5">
          {movie?.overview}
        </Text>
        <HeaderAndMoviesTvShows
          title={`Similar ${media_type === 'movie' ? 'Movies' : 'TV Shows'}`}
          list={similars}
        />
      </View>
    </ScrollView>
  );
};

export default MovieDetails;
