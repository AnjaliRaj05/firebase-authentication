import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-web';

const StartPage = () => {
  return (
    <View className="flex-1 justify-center items-center">
    <ActivityIndicator size="large" color='gray' />
    </View>
  )
}

export default StartPage;