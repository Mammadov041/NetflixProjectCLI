import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TabStack from './TabStack';
import {useMMKVBoolean, useMMKVString} from 'react-native-mmkv';
import AuthStack from './AuthStack';
import OnBoardingStack from './OnBoardingStack';

function Navigation() {
  const [token, setToken] = useMMKVString('token');
  const [hasSeenOnboarding, setHasSeenOnboarding] =
    useMMKVBoolean('hasSeenOnboarding');

  return (
    <NavigationContainer>
      {hasSeenOnboarding ? (
        token ? (
          <TabStack />
        ) : (
          <AuthStack />
        )
      ) : (
        <OnBoardingStack />
      )}
    </NavigationContainer>
  );
}

export default Navigation;
