import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

const home = () => {
  const {logout} = useAuth();
  const handleLogout = async () => {
    await logout();
  }
  return (
   <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold">Home page</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  )
}

export default home