import { apiClient } from "../../../services/api/client/apiClient";
import { User } from "../../auth/types/auth.types";

export interface UpdateProfileRequest {
  name: string;
}

interface ProfileApiResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar_url: string | null;
  };
}

const mapUser = (
  user: ProfileApiResponse["data"]
): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatarUrl: user.avatar_url,
});

export async function getProfile(): Promise<User> {
  const response =
    await apiClient.get<ProfileApiResponse>(
      "/users/me"
    );

  return mapUser(response.data.data);
}

export async function updateProfile(
  payload: UpdateProfileRequest
): Promise<User> {
  const response =
    await apiClient.patch<ProfileApiResponse>(
      "/users/me",
      payload
    );

  return mapUser(response.data.data);
}