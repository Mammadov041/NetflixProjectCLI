import {TextInput} from 'react-native';
import React from 'react';

const Input = ({placeholder, name, setFormData}) => {
  const handleInputChange = (key, value) => {
    setFormData(prev => ({...prev, [key]: value}));
  };

  return (
    <TextInput
      secureTextEntry={name === 'password'}
      onChangeText={text => handleInputChange(name, text)}
      placeholder={placeholder}
      placeholderTextColor="#5c5c5c"
      className="w-full border border-[#5c5c5c] font-montSerrat text-white rounded-md px-4 bg-[#161616B2] py-5"
    />
  );
};

export default Input;
