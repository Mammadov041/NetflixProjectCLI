import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useMMKVString} from 'react-native-mmkv';
import Button from '../../common/Button';
import {getSearchHistoryAsync} from '../../api/searchHistoryApi';
import {logOutUser} from '../../api/authApi';
import HeaderAndMoviesTvShows from '../../common/HeaderAndMoviesTvShows';

const Profile = () => {
  const [token, setToken] = useMMKVString('token');
  const [history, setHistory] = useState([]);
  const [email, setEmail] = useMMKVString('email');
  const buttonOnSubmit = async () => {
    setToken('');
    await logOutUser();
  };
  const searchHistoryAsync = async () => {
    const searchHistory = await getSearchHistoryAsync(token);
    setHistory(searchHistory);
  };

  useEffect(() => {
    searchHistoryAsync();
  }, []);

  return (
    <View className="bg-black p-5 h-full gap-8">
      {history.length > 0 ? (
        <HeaderAndMoviesTvShows title="Search History" list={history} />
      ) : (
        <Text className="font-montSerratBold text-2xl">No search history</Text>
      )}
      <View className="p-6 gap-7">
        <Text className="text-white font-montSerrat text-3xl self-center">
          Profile Info
        </Text>
        <Text className="text-xl font-montSerrat text-white self-center">
          Email : {email}
        </Text>
        <Button
          title="Log out"
          onPress={buttonOnSubmit}
          className="border-[1px] w-full items-center py-1"
        />
      </View>
    </View>
  );
};

export default Profile;
