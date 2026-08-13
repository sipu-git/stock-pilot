import { getCurrentUser } from "../../auth/api/userApi";
import { authStorage } from "../../auth/services/authStorage";

export async function bootstrap() {
  const accessToken = await authStorage.getAccessToken();
  const refreshToken = await authStorage.getRefreshToken();

  console.log("Token:", accessToken);
  console.log("Refresh:", refreshToken);

  if (!accessToken || !refreshToken) {
    console.log("No token found");
    return null;
  }

  try {
    const response = await getCurrentUser();

    console.log("User API Response:", response);

    return {
      user: response.data,
      accessToken,
      refreshToken,
    };
  } catch (err) {
    console.log("Bootstrap Error:", err);
    return null;
  }
}