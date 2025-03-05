import {
  Image,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../../../common/Input';
import Button from '../../../common/Button';
import netflixLogo from '../../../../assets/images/netflixLogo.png';
import {useNavigation} from '@react-navigation/native';
import {registerUser} from '../../../api/authApi';
import {useMMKVBoolean} from 'react-native-mmkv';

const Register = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const [hasSeenOnboarding, setHasSeenOnboarding] =
    useMMKVBoolean('hasSeenOnboarding');

  const validateForm = () => {
    let missingFields = [];
    if (!formData.username) missingFields.push('Username');
    if (!formData.email) missingFields.push('Email');
    if (!formData.password) missingFields.push('Password');

    if (missingFields.length === 1) {
      setErrorMessage(`Please enter ${missingFields[0]}`);
    } else if (missingFields.length > 1) {
      setErrorMessage('Please enter all credentials');
    } else {
      setErrorMessage('');
      return true;
    }
    return false;
  };

  const signUpAsync = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const data = await registerUser(formData);
      console.log('Server response:', data);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error in signUpAsync:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center justify-center px-4 gap-5 bg-black">
          <View className="absolute top-0 left-0 p-4">
            <Image
              source={netflixLogo}
              resizeMode="contain"
              style={{width: 100, height: 40}}
            />
          </View>
          <Text className="font-montSerratBold text-[25px] text-white self-start">
            Sign Up
          </Text>
          <Input
            placeholder="Username"
            setFormData={setFormData}
            name="username"
          />
          <Input placeholder="Email" setFormData={setFormData} name="email" />
          <Input
            placeholder="Password"
            setFormData={setFormData}
            name="password"
          />
          {errorMessage && (
            <Text className="text-[#E50914] font-montSerratBold">
              {errorMessage}
            </Text>
          )}
          <Button
            onPress={signUpAsync}
            className="border-[1px] w-full items-center justify-center py-3"
            title="Sign Up"
          />
          <View className="justify-center items-center gap-2">
            <Text className="font-montSerrat text-gray-500">
              Already have a Netflix account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="font-montSerrat text-white"> Sign in</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setHasSeenOnboarding(false)}>
            <Text className="font-montSerratLightItalic text-white">
              Set hasSeenOnboarding to False
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
