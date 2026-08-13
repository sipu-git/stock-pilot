import { apiClient } from "../../../services/api/client/apiClient";

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export async function changePassword(
  payload: ChangePasswordRequest
): Promise<ChangePasswordResponse> {
  const response =
    await apiClient.patch<ChangePasswordResponse>(
      "/users/change-password",
      payload
    );

  return response.data;
}