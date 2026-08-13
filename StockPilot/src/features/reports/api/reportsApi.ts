import { apiClient } from "../../../services/api/client/apiClient";
import { CategoryReport, InventoryValuation, ProductReport } from "../types";


interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export async function getInventoryValuation() {
  const response =
    await apiClient.get<ApiResponse<InventoryValuation>>(
      "/reports/inventory-valuation",
    );

  return response.data.data;
}

export async function getCategoryReport() {
  const response =
    await apiClient.get<ApiResponse<CategoryReport[]>>(
      "/reports/category-report",
    );

  return response.data.data;
}

interface ProductReportListResponse {
  success: boolean;

  data: ProductReport[];

  meta: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export async function getProductReport(
  params?: {
    search?: string;
    page?: number;
    limit?: number;
  }
): Promise<ProductReportListResponse> {
  const { data } =
    await apiClient.get<ProductReportListResponse>(
      "/reports/product-report",
      {
        params,
      }
    );

  return data;
}