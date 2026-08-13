import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCategory } from "../api/categoryApi";
import { CategoryPayload } from "../types";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CategoryPayload;
    }) => updateCategory(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      queryClient.invalidateQueries({
  queryKey: ["dashboard"],
});
    },
  });
};