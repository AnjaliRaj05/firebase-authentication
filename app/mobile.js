import React, { useState } from 'react';
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
import { useAuth } from '../context/authContext';

const Mobile = () => {
  const router = useRouter();
  const { sendOtp, verifyOtp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      showAlert('Mobile Login', 'Please enter your phone number');
      return;
    }

    setLoading(true);
    const result = await sendOtp(`+91${phone}`);
    setLoading(false);

    if (result.success) {
      setConfirmation(result.confirmation);
    } else {
      showAlert('Mobile Login', result.msg);
    }
  };

const handleVerifyOtp = async () => {
  if (!otp.trim() || !confirmation) {
    showAlert('Mobile Login', 'Please enter the OTP');
    return;
  }

  setLoading(true);
  try {
    const result = await verifyOtp(confirmation, otp.trim());
    setLoading(false);

    if (result.success) {
      const user = result.data;
      const idToken = await user.getIdToken();
      console.log('ID Token:', idToken);
      router.replace('/(app)/home');
    } else {
      showAlert('Mobile Login', result.msg);
    }
  } catch (error) {
    setLoading(false);
    showAlert('Mobile Login', 'OTP verification failed');
  }
};
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
        <Text
          style={{ fontSize: hp(4) }}
          className="font-bold tracking-wider text-center text-neutral-800"
        >
          What's your number?
        </Text>
        <View className="gap-6">
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
          >
        <Image
          source={{ uri: 'https://flagcdn.com/w40/in.png' }}
          style={{ width: hp(3), height: hp(3) }}
          resizeMode="contain"
       />
            <TextInput
  value={phone}
  onChangeText={(text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 10) {
      setPhone(numericText);
    }
  }}
  maxLength={10}
  style={{ fontSize: hp(2) }}
  className="flex-1 font-semibold text-neutral-700"
  placeholder="Phone number"
  placeholderTextColor="gray"
  keyboardType="phone-pad"
/>

          </View>

          {confirmation && (
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="shield" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={setOtp}
                value={otp}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Enter OTP"
                placeholderTextColor="gray"
                keyboardType="number-pad"
              />
            </View>
          )}

          <TouchableOpacity
            onPress={confirmation ? handleVerifyOtp : handleSendOtp}
            style={{ height: hp(6.5) }}
            className="bg-orange-500 rounded-xl justify-center items-center"
          >
            {loading ? (
              <Loading size={hp(6.5)} />
            ) : (
              <Text
                style={{ fontSize: hp(2.5) }}
                className="text-white font-bold tracking-wider"
              >
                {confirmation ? 'Verify OTP' : 'Send OTP'}
              </Text>
            )}
          </TouchableOpacity>

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <div id="recaptcha"></div>
          </View>
        </View>

        <View className="flex-row justify-center mt-2">
          <Pressable onPress={() => router.push('signUp')}>
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-bold text-orange-500"
            >
              Or Sign Up with Email
            </Text>
          </Pressable>
        </View>
      </View>
    </CustomKeyboard>
  );
};

export default Mobile;