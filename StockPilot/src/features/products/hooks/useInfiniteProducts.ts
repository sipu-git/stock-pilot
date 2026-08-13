import { useInfiniteQuery } from "@tanstack/react-query";

import { getProducts } from "../api/productApi";
import { ProductQueryParams } from "../types";
import { PRODUCT_QUERY_KEY } from "./useProducts";

export function useInfiniteProducts(
  params?: Omit<ProductQueryParams, "page">
) {
  return useInfiniteQuery({
    queryKey: [PRODUCT_QUERY_KEY, params],

    queryFn: ({ pageParam }: { pageParam: number }) =>
  getProducts({
    ...params,
    page: pageParam,
    limit: 10,
  }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasMore) {
        return undefined;
      }

      return lastPage.meta.page + 1;
    },
  });
}