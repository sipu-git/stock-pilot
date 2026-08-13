import { useMutation } from "@tanstack/react-query";

import { createCategory } from "../api/categoryApi";
import { queryClient } from "../../../core/query/queryClient";

export function useCreateCategory() {
  return useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["categories"],
  });

  queryClient.invalidateQueries({
    queryKey: ["dashboard"],
  });
},
  });
}