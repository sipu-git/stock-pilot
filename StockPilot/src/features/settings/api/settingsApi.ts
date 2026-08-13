import { apiClient } from "../../../services/api/client/apiClient";

export type UpdateProfileRequest = {
  name: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url: string | null;
};

export async function getMyProfile() {
  const response = await apiClient.get("/users/me");

  return response.data.data;
}

export async function updateProfile(
  payload: UpdateProfileRequest
) {
  const response = await apiClient.patch(
    "/users/me",
    payload
  );

  return response.data.data;
}