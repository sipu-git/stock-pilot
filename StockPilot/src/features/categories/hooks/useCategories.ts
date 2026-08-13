import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categoryApi";
import { Category } from "../types";


export function useCategories(search = "") {
  return useQuery<Category[]>({
    queryKey: ["categories", search],

    queryFn: async () => {
      const response = await getCategories({
        page: 1,
        limit: 1000,
        search,
      });

      return response.data;
    },
  });
}