import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../api/dashboardApi";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
};