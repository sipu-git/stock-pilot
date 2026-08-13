import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/productApi";
import { ProductQueryParams } from "../types";

export const PRODUCT_QUERY_KEY = "products";

export const useProducts = (
  params?: ProductQueryParams
) => {
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEY, params],
    queryFn: () => getProducts(params),
  });
};