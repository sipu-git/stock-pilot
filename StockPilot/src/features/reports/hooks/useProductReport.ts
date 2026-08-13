import { useQuery } from "@tanstack/react-query";

import { getProductReport } from "../api/reportsApi";

export const PRODUCT_REPORT_QUERY_KEY =
  "product-report";

export function useProductReport(
  search = "",
) {
  return useQuery({
    queryKey: [
      PRODUCT_REPORT_QUERY_KEY,
      search,
    ],

    queryFn: () =>
      getProductReport(search),
  });
}