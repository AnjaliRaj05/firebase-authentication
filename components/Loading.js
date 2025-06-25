import { View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = ({ size = 100 }) => {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        source={require('../assets/images/loader.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;

