import { useMutation } from "@tanstack/react-query";

import {
  changePassword,
  ChangePasswordRequest,
} from "../api/passwordApi";

export function useChangePassword() {
  return useMutation({
    mutationFn: (
      data: ChangePasswordRequest
    ) => changePassword(data),
  });
}