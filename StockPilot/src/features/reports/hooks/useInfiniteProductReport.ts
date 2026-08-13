import { useInfiniteQuery } from "@tanstack/react-query";

import { getProductReport } from "../api/reportsApi";

export const PRODUCT_REPORT_QUERY_KEY =
  "product-report";

export function useInfiniteProductReport(
  search = ""
) {
  return useInfiniteQuery({
    queryKey: [
      PRODUCT_REPORT_QUERY_KEY,
      search,
    ],

    queryFn: ({ pageParam }) =>
      getProductReport({
        search,
        page: pageParam,
        limit: 10,
      }),

    initialPageParam: 1,

    getNextPageParam: (
      lastPage
    ) => {
      if (!lastPage.meta.hasMore) {
        return undefined;
      }

      return lastPage.meta.page + 1;
    },
  });
}