import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

const Logout = () => {
  const {logout} = useAuth();
  const handleLogout = async () => {
    await logout();
  }
  return (
   <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold">Logout</Text>
      <Pressable onPress={handleLogout}>
      </Pressable>
    </View>
  )
}

export default Logout;