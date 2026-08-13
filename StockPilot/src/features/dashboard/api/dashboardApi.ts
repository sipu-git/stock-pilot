import { apiClient } from "../../../services/api/client/apiClient";
import { DashboardResponse } from "../types";

export const getDashboard = async (): Promise<DashboardResponse> => {

  const response = await apiClient.get("/dashboard");


  return response.data.data;
};