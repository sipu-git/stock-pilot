import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categoryApi";

export const CATEGORY_QUERY_KEY = "categories-infinite";

export function useInfiniteCategories(search = "") {
  return useInfiniteQuery({
    queryKey: [CATEGORY_QUERY_KEY, search],

    queryFn: ({ pageParam }) =>
      getCategories({
        page: pageParam,
        limit: 10,
        search,
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