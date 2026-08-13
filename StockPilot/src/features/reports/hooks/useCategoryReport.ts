import { useQuery } from "@tanstack/react-query";

import { getCategoryReport } from "../api/reportsApi";

export const CATEGORY_REPORT_QUERY_KEY =
  "category-report";

export function useCategoryReport() {
  return useQuery({
    queryKey: [CATEGORY_REPORT_QUERY_KEY],
    queryFn: getCategoryReport,
  });
}