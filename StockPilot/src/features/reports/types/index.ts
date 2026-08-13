export interface InventoryValuation {
  total_products: number;
  total_units: number;
  purchase_value: number;
  selling_value: number;
  potential_profit: number;
}

export interface CategoryReport {
  category_id: string;
  category_name: string;
  total_products: number;
  total_units: number;
  purchase_value: number;
  selling_value: number;
  potential_profit: number;
}

export interface ProductReport {
  id: string;
  name: string;
  sku: string;
  category_name: string | null;

  current_quantity: number;

  purchase_price: number;

  selling_price: number;

  purchase_value: number;

  selling_value: number;

  potential_profit: number;

  status: string;
}