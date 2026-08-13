import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createProduct } from "../api/productApi";
import { PRODUCT_QUERY_KEY } from "./useProducts";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: [PRODUCT_QUERY_KEY],
  });

  queryClient.invalidateQueries({
    queryKey: ["dashboard"],
  });
},
  });
};