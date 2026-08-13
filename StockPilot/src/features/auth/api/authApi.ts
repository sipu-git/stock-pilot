import { apiClient } from '../../../services/api/client/apiClient';

import type {
  AuthResponse,
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
} from '../types/auth.types';

export const loginApi = async (
  payload: LoginRequest,
): Promise<AuthResponse> => {
  const { data } =
    await apiClient.post<AuthResponse>(
      '/auth/login',
      payload,
    );

  return data;
};

export const registerApi = async (
  payload: RegisterRequest,
): Promise<AuthResponse> => {
  const { data } =
    await apiClient.post<AuthResponse>(
      '/auth/register',
      payload,
    );

  return data;
};

export const refreshTokenApi = async (
  payload: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  const { data } =
    await apiClient.post<RefreshTokenResponse>(
      '/auth/refresh',
      payload,
    );

  return data;
};

export const logoutApi = async () => {
  await apiClient.post('/auth/logout');
};