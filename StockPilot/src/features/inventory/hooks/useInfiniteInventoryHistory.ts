import { useInfiniteQuery } from "@tanstack/react-query";
import { getInventoryHistory } from "../api/inventory";

export function useInfiniteInventoryHistory(
  search = "",
  type?: "STOCK_IN" | "STOCK_OUT",
) {
  return useInfiniteQuery({
    queryKey: [
      "inventory-history",
      search,
      type,
    ],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getInventoryHistory({
        page: pageParam,
        limit: 10,
        search,
        type,
      }),

    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasMore
        ? lastPage.meta.page + 1
        : undefined;
    },

    // 👇 Required in React Query v5
    maxPages: 5,
  });
}