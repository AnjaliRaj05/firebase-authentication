import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboard from '../components/customKeyboard';
import { useAuth } from '../context/authContext'; // ✅ import context

const SignIn = () => {
  const router = useRouter();
  const { login } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      showAlert('Sign In', 'Please fill all the fields');
      return;
    }

    setLoading(true);

    const response = await login(emailRef.current, passwordRef.current);

    setLoading(false);

    if (!response.success) {
      showAlert('Sign In', response.msg);
  };
  }
  return (
    <CustomKeyboard>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >

        <View
  className="items-center w-full"
  style={{ height: hp(25), justifyContent: 'center' }}
>
  <Image
    style={{ height: '100%', width: '100%' }}
    resizeMode="contain"
    source={require('../assets/images/logo1.webp')}
  />
</View>


        {/* Title and Inputs */}
        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
           
          </Text>

          {/* Input Fields */}
          <View className="gap-4">
            {/* Email Input */}
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(text) => (emailRef.current = text)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email address"
                placeholderTextColor="gray"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="lock" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(text) => (passwordRef.current = text)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
              />
            </View>

            {/* Forget Password Text */}
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-right text-neutral-500"
            >
              Forget Password
            </Text>

            {/* Submit Button or Loader */}
            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{ height: hp(6.5) }}
                  className="bg-orange-500 rounded-xl justify-center items-center"
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-2">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Don't have an account?{' '}
              </Text>
              <Pressable onPress={() => router.push('signUp')}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-orange-500"
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboard>
  );
};

export default SignIn;
