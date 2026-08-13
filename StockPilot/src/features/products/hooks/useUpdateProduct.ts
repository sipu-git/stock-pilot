import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateProduct } from "../api/productApi";
import { PRODUCT_QUERY_KEY } from "./useProducts";
import { UpdateProductRequest } from "../types";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProductRequest;
    }) => updateProduct(id, payload),

    onSuccess: (_, variables) => {
  queryClient.invalidateQueries({
    queryKey: [PRODUCT_QUERY_KEY],
  });

  queryClient.invalidateQueries({
    queryKey: ["product", variables.id],
  });

  queryClient.invalidateQueries({
    queryKey: ["dashboard"],
  });
},
  });
};