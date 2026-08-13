import { apiClient } from "../../../services/api/client/apiClient";

export async function getCurrentUser() {
  const response = await apiClient.get("/users/me");

  return response.data;
}