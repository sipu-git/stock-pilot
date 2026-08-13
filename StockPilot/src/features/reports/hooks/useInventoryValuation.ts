import { useQuery } from "@tanstack/react-query";

import { getInventoryValuation } from "../api/reportsApi";

export const INVENTORY_VALUATION_QUERY_KEY =
  "inventory-valuation";

export function useInventoryValuation() {
  return useQuery({
    queryKey: [INVENTORY_VALUATION_QUERY_KEY],
    queryFn: getInventoryValuation,
  });
}