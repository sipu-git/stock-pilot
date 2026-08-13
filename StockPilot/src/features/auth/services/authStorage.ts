import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

export const authStorage = {
  saveTokens: async (
    accessToken: string,
    refreshToken: string,
  ) => {
    await SecureStore.setItemAsync(
      ACCESS_TOKEN,
      accessToken,
    );

    await SecureStore.setItemAsync(
      REFRESH_TOKEN,
      refreshToken,
    );
  },

  getAccessToken: () =>
    SecureStore.getItemAsync(ACCESS_TOKEN),

  getRefreshToken: () =>
    SecureStore.getItemAsync(REFRESH_TOKEN),

  clear: async () => {
    await SecureStore.deleteItemAsync(
      ACCESS_TOKEN,
    );

    await SecureStore.deleteItemAsync(
      REFRESH_TOKEN,
    );
  },
};