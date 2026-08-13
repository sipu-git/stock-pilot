export interface DashboardSummary {
  total_products: number;
  total_categories: number;
  low_stock: number;
  out_of_stock: number;
  inventory_value: number;
}

export interface LowStockProduct {
  id: string;
  name: string;
  sku: string;
  current_quantity: number;
  minimum_quantity: number;
}

export interface RecentTransaction {
  id: string;
  product_name: string;
  quantity: number;
  quantity_before: number;
  quantity_after: number;
  created_at: string;
  type: "STOCK_IN" | "STOCK_OUT" | "ADJUSTMENT";
}

export interface TrendItem {
  day: string;
  stock_in: number;
  stock_out: number;
}

export interface CategoryDistributionItem {
  category: string;
  total_products: number;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  lowStock: LowStockProduct[];
  recentTransactions: RecentTransaction[];
  trend: TrendItem[];
  categoryDistribution: CategoryDistributionItem[];
}