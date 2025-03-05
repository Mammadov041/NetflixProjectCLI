import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({onPress, title, className}) => {
  return (
    <TouchableOpacity
      className={`bg-[#E50914] rounded-sm text-center self-center ${className}`}
      onPress={onPress}>
      <Text className="font-montSerratBold text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
