import { useSnackbarContext } from "../core/providers/SnackbarProvider";

export const useSnackbar = () => {
  return useSnackbarContext();
};