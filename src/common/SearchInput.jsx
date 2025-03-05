import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import SearchIcon from '../../assets/icons/search.svg';

const SearchInput = ({placeholder, onChangeText, search}) => {
  return (
    <View className="px-2 w-full flex-row bg-[#5c5c5c] border-gray-700 rounded-lg text-gray-600 justify-between">
      <TextInput onChangeText={onChangeText} placeholder={placeholder} />;
      <TouchableOpacity onPress={search}>
        <SearchIcon width={30} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
