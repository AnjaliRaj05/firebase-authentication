import { Slot, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { AuthContextProvider, useAuth } from '../context/authContext';
import "../global.css"; 
import { Provider } from 'react-redux';
import { store } from '../slices/index';

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return;

    const inApp = segments[0] === '(app)';

    if (isAuthenticated && !inApp) {
      router.replace('/home');
    } else if (isAuthenticated === false) {
      router.replace('/mobile');
    }
  }, [isAuthenticated]);

  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
