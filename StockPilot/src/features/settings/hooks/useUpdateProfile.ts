import { useMutation } from "@tanstack/react-query";

import {
  updateProfile,
  UpdateProfileRequest,
} from "../api/profileApi";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      updateProfile(data),
  });
}