// import { apiClient } from "../../../services/api/client/apiClient";
// import { InventoryHistoryResponse, UpdateStockPayload } from "../types";

// export async function getInventoryHistory(
//   page = 1,
//   limit = 20,
// ) {
//   const response = await apiClient.get<InventoryHistoryResponse>(
//     "/inventory/history",
//     {
//       params: {
//         page,
//         limit,
//       },
//     },
//   );

//   return response.data;
// }





// export async function updateStock(
//   payload: UpdateStockPayload,
// ) {
//   const response =
//     await apiClient.post(
//       "/inventory/movements",
//       payload,
//     );

//   return response.data;
// }




import { apiClient } from "../../../services/api/client/apiClient";
import {
  InventoryHistoryResponse,
  UpdateStockPayload,
} from "../types";

export interface GetInventoryHistoryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: "STOCK_IN" | "STOCK_OUT";
}

export async function getInventoryHistory({
  page = 1,
  limit = 20,
  search = "",
  type,
}: GetInventoryHistoryParams = {}) {
  const response =
    await apiClient.get<InventoryHistoryResponse>(
      "/inventory/history",
      {
        params: {
          page,
          limit,
          search,
          type,
        },
      },
    );

  return response.data;
}

export async function updateStock(
  payload: UpdateStockPayload,
) {
  const response = await apiClient.post(
    "/inventory/movements",
    payload,
  );

  return response.data;
}