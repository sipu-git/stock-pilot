import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteProduct } from "../api/productApi";
import { PRODUCT_QUERY_KEY } from "./useProducts";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,

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