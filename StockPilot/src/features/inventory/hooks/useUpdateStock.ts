import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { PRODUCT_QUERY_KEY } from "../../products/hooks/useProducts";
import { UpdateStockPayload } from "../types";
import { updateStock } from "../api/inventory";

export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateStockPayload) =>
      updateStock(payload),

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

      queryClient.invalidateQueries({
        queryKey: ["inventory-history"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};