import React from 'react';
import { StatusBar } from 'expo-status-bar';
import "../../services/api/client/interceptors"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';

import { store } from '../store';
import { queryClient } from '../query/queryClient';
import { RootNavigator } from '../navigation/RootNavigator';
import { useAppTheme } from '../theme/useAppTheme';
import { SnackbarProvider } from './SnackbarProvider';

function ThemedApp() {
  const theme = useAppTheme();
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <RootNavigator />
    </PaperProvider>
  );
}

export function AppProviders() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
             <ThemedApp />
            </SnackbarProvider>
          </QueryClientProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}