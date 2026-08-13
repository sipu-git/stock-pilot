export interface InventoryTransaction {
  id: string;
  product_name: string;
  sku: string;
  type: "STOCK_IN" | "STOCK_OUT" | "ADJUSTMENT";
  quantity: number;
  quantity_before: number;
  quantity_after: number;
  unit_cost: number | null;
  notes: string | null;
  reference_no: string | null;
  created_at: string;
}

export interface InventoryHistoryResponse {
  success: boolean;
  data: InventoryTransaction[];
  meta: {
    page: number;
    limit: number;
    hasMore: boolean;
  };
}


export type StockOperation =
  | "STOCK_IN"
  | "STOCK_OUT";

export interface StockSummary {
  id: string;
  name: string;
  sku: string;
  currentQuantity: number;
}

export interface UpdateStockPayload {
  productId: string;
  type: StockOperation;
  quantity: number;
  notes?: string;
}