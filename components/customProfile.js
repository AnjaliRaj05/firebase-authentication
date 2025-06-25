import React from 'react';
import { View, Text, Image } from 'react-native';

export default function customProfile({ name = 'User Name', avatar }) {
  return (
    <View className="items-center py-6">
      <Image
        source={{ uri: avatar || 'https://i.pravatar.cc/150?img=32' }}
        className="w-16 h-16 rounded-full mb-2"
      />
      <Text className="text-base font-bold text-gray-800">{name}</Text>
    </View>
  );
}
