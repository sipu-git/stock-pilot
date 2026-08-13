export interface Category {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  color: string;
  icon: string;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryPayload {
  name: string;
  description?: string;
}