import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';

import { useAppSelector } from '../../hooks/useAppSelector';

import { SplashScreen } from '../../features/splash/components/SplashScreen';
import { useBootstrap } from '../../features/splash/hooks/useBootstrap';

export function RootNavigator() {
  const { loading } = useBootstrap();

  const isAuthenticated = useAppSelector(
  (state) => state.auth.isAuthenticated,
);

console.log("isAuthenticated:", isAuthenticated);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}