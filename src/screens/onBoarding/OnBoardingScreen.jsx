import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useMMKVBoolean} from 'react-native-mmkv';
import Button from '../../common/Button';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Watch on any device',
    description:
      'Stream on your phone, tablet, laptop and TV without playing more',
    image: require('../../../assets/images/device.png'),
  },
  {
    id: '2',
    title: '3, 2, 1,... download!',
    description: 'Always have something to watch offline',
    image: require('../../../assets/images/download.png'),
  },
  {
    id: '3',
    title: 'No pesky contracts.',
    description: 'Cancel anytime',
    image: require('../../../assets/images/contract.png'),
  },
  {
    id: '4',
    title: 'How do I watch?',
    description: 'Members that subscribe to Netflix can watch here in the app',
    image: require('../../../assets/images/bgImage.png'),
  },
];

const OnboardingScreen = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] =
    useMMKVBoolean('hasSeenOnboarding');
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const netflixLogo = require('../../../assets/images/netflixLogo.png');
  const navigation = useNavigation();
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        translateX.setValue(-currentIndex * width + gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -50 && currentIndex < slides.length - 1) {
          goToNextSlide();
        } else if (gesture.dx > 50 && currentIndex > 0) {
          goToPreviousSlide();
        } else {
          Animated.spring(translateX, {
            toValue: -currentIndex * width,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
      Animated.spring(translateX, {
        toValue: -(currentIndex + 1) * width,
        useNativeDriver: true,
      }).start();
    } else {
      setHasSeenOnboarding(true);
    }
  };

  const goToPreviousSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      Animated.spring(translateX, {
        toValue: -(currentIndex - 1) * width,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Slides */}
      <Animated.View
        {...panResponder.panHandlers}
        className="flex-row w-full h-full"
        style={{transform: [{translateX}]}}>
        {slides.map(item => (
          <ImageBackground
            key={item.id}
            source={item.id === '4' ? item.image : null}
            className="w-full h-full">
            <View className="w-full h-full bg-black/8 items-center py-10">
              <Image
                source={netflixLogo}
                resizeMode="contain"
                className="h-12"
              />
              <Image
                width={220}
                height={220}
                source={item.id !== '4' && item.image}
                className="w-64 h-64 mt-20"
                resizeMode="contain"
              />
              <Text className="font-montSerrat text-white text-2xl font-bold text-center">
                {item.title}
              </Text>
              <Text className="font-montSerrat text-gray-300 text-base text-center mt-2 w-[280px]">
                {item.description}
              </Text>
              <TouchableOpacity
                className="absolute right-7 top-9"
                onPress={() => navigation.navigate('Help')}>
                <Text className="text-white  font-montSerratSemiBold text-[13px]">
                  Help
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ))}
      </Animated.View>

      {/* Pagination Indicators */}
      <View className="absolute gap-5 bottom-24 flex-row justify-center w-full">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentIndex ? 'bg-red-600' : 'bg-white'
            }`}
          />
        ))}
      </View>

      {/* Next Button */}
      <Button
        onPress={goToNextSlide}
        className="absolute bottom-5 py-1 text-center justify-center items-center w-[370px]"
        title={currentIndex === slides.length - 1 ? 'GET STARTED' : 'NEXT'}
      />
    </View>
  );
};

export default OnboardingScreen;
