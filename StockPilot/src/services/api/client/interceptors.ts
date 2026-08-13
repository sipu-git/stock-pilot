import { apiClient } from './apiClient';
import { authStorage } from '../../../features/auth/services/authStorage';

apiClient.interceptors.request.use(async (config) => {
  const token = await authStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});