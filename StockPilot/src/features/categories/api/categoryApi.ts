import { apiClient } from "../../../services/api/client/apiClient";
import { CategoryPayload } from "../types";

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getCategories = async ({
  page = 1,
  limit = 20,
  search = "",
}: GetCategoriesParams) => {
  const { data } = await apiClient.get("/categories", {
    params: {
      page,
      limit,
      search,
    },
  });

  return data;
};

export const createCategory = (data: CategoryPayload) =>
  apiClient.post("/categories", data);

export const updateCategory = (
  id: string,
  data: CategoryPayload
) => apiClient.patch(`/categories/${id}`, data);

export const deleteCategory = (id: string) =>
  apiClient.delete(`/categories/${id}`);