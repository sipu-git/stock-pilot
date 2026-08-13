/* ===========================================================
   Product Status
=========================================================== */

export type ProductStatus =
  | "ACTIVE"
  | "LOW_STOCK"
  | "OUT_OF_STOCK"
  | "OVERSTOCKED";

/* ===========================================================
   Product
=========================================================== */

export interface Product {
  id: string;

  name: string;

  sku: string;

  categoryId: string;

  categoryName?: string;

  purchasePrice: number;

  sellingPrice: number;

  discount: number;

  tax: number;

  currentQuantity: number;

  minimumQuantity: number;

  maximumQuantity: number;

  status: ProductStatus;

  description?: string;

  images: string[];

  createdAt: string;

  updatedAt: string;
}

/* ===========================================================
   Create Product Request
=========================================================== */

export interface CreateProductRequest {
  name: string;

  sku: string;

  categoryId: string;

  purchasePrice: number;

  sellingPrice: number;

  discount?: number;

  tax?: number;

  currentQuantity?: number;

  minimumQuantity?: number;

  maximumQuantity?: number;

  description?: string;
}

/* ===========================================================
   Update Product Request
=========================================================== */

export interface UpdateProductRequest
  extends Partial<CreateProductRequest> {}

/* ===========================================================
   Product List Query
=========================================================== */

export interface ProductQueryParams {
  page?: number;

  limit?: number;

  search?: string;

  categoryId?: string;

  status?: ProductStatus;

  priceType?: "selling_price" | "purchase_price";

  minPrice?: number;

  maxPrice?: number;

  sort?:
    | "created_at"
    | "updated_at"
    | "name"
    | "purchase_price"
    | "selling_price"
    | "current_quantity"
    | "status";
  order?: "asc" | "desc";
}

/* ===========================================================
   Pagination Meta
=========================================================== */

export interface PaginationMeta {
  page: number;

  limit: number;

  total: number;

  hasMore: boolean;
}

/* ===========================================================
   Product List Response
=========================================================== */

export interface ProductListResponse {
  success: boolean;

  data: Product[];

  meta: PaginationMeta;
}

/* ===========================================================
   Single Product Response
=========================================================== */

export interface ProductResponse {
  success: boolean;

  data: Product;
}

/* ===========================================================
   Delete Product Response
=========================================================== */

export interface DeleteProductResponse {
  success: boolean;

  message: string;
}