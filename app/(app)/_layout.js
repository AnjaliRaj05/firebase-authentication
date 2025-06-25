import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Text, View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import CustomProfile from '../../components/customProfile';
import { useRouter } from 'expo-router';
const screens = [
  { name: 'home', label: 'Home', icon: 'home-outline' },
  { name: 'profile', label: 'Profile', icon: 'person-outline' },
  { name: 'setting', label: 'Settings', icon: 'settings-outline' },
  { name: 'my-rides', label: 'My Rides', icon: 'car-outline' },
  { name: 'payment', label: 'Payment', icon: 'card-outline' },
  { name: 'help', label: 'Help', icon: 'help-circle-outline' },
  { name: 'support', label: 'Support', icon: 'chatbox-ellipses-outline' },
  { name: 'refer', label: 'Refer', icon: 'gift-outline' },
  { name: 'logout', label: 'Logout', icon: 'log-out-outline' }

];

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <CustomProfile /> 
      <View className="h-px bg-gray-200 mx-5 mb-2" />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  const router = useRouter();
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => {
        const screen = screens.find(s => s.name === route.name);
        const iconName = screen?.icon || 'ellipse-outline';
        return {
          drawerStyle: {
            backgroundColor: '#fff',
          },
          
        headerTitle: route.name === 'home' ? () => (
            <View className="flex-1 items-center justify-center">
              <Pressable
                onPress={() => router.push('/location')}
                className="w-80 bg-gray-100 flex-row items-center justify-center rounded-full px-4 py-2 border border-orange-500 ml-[500px]"
              >
                <Ionicons name="search" size={16} color="#3b82f6" />
                <Text className="ml-2 text-gray-700 text-center flex-1">
                  Enter pickup location
                </Text>
              </Pressable>
            </View>
          ) : undefined,

          drawerActiveBackgroundColor: '#F97316',
          drawerActiveTintColor: '#fff',
          drawerLabel: ({ focused }) => {
            const label = screen?.label || route.name;
            return (
              <Text className={focused ? 'text-white font-bold' : 'text-base  text-gray-500'}>
                {label}
              </Text>
            );
          },
          drawerIcon: ({ size, focused }) => (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? '#fff' : 'gray'} 
            />
          ),
        };
      }}
    />
  );
}
