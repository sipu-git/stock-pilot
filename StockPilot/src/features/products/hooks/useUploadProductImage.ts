import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { uploadProductImage } from "../api/productApi";
import { PRODUCT_QUERY_KEY } from "./useProducts";

export const useUploadProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      image,
    }: {
      productId: string;
      image: string;
    }) =>
      uploadProductImage(productId, image),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_QUERY_KEY],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "product",
          variables.productId,
        ],
      });
    },
  });
};