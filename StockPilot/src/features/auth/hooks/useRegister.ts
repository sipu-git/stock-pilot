// import { useMutation } from '@tanstack/react-query';

// import { registerApi } from '../api/authApi';
// import { authStorage } from '../services/authStorage';
// import { setCredentials } from '../store/authSlice';
// import { useAppDispatch } from '../../../hooks/useAppDispatch';

// export function useRegister() {
//   const dispatch = useAppDispatch();

//   return useMutation({
//     mutationFn: registerApi,

//     onSuccess: async (response) => {
//       await authStorage.saveTokens(
//         response.data.accessToken,
//         response.data.refreshToken,
//       );

//       dispatch(
//         setCredentials({
//           user: response.data.user,
//           accessToken: response.data.accessToken,
//           refreshToken: response.data.refreshToken,
//         }),
//       );
//     },
//   });
// }


import { useMutation } from "@tanstack/react-query";

import { registerApi } from "../api/authApi";

export function useRegister() {
  return useMutation({
    mutationFn: registerApi,
  });
}