import { apiClient } from "../../../services/api/client/apiClient";
import {
  Product,
  ProductListResponse,
  ProductQueryParams,
  CreateProductRequest,
  UpdateProductRequest,
  ProductResponse,
  DeleteProductResponse,
} from "../types";

/* ===========================================================
   Backend Product Type
=========================================================== */

interface ProductApi {
  id: string;

  name: string;

  sku: string;

  category_id: string;

  category_name?: string;

  purchase_price: number;

  selling_price: number;

  discount: number;

  tax: number;

  current_quantity: number;

  minimum_quantity: number;

  maximum_quantity: number;

  status: Product["status"];

  description?: string;

  images: string[];

  created_at: string;

  updated_at: string;
}

/* ===========================================================
   Mapper
=========================================================== */

const mapProduct = (product: ProductApi): Product => ({
  id: product.id,

  name: product.name,

  sku: product.sku,

  categoryId: product.category_id,

  categoryName: product.category_name,

  purchasePrice: product.purchase_price,

  sellingPrice: product.selling_price,

  discount: product.discount,

  tax: product.tax,

  currentQuantity: product.current_quantity,

  minimumQuantity: product.minimum_quantity,

  maximumQuantity: product.maximum_quantity,

  status: product.status,

  description: product.description,

  images: product.images ?? [],

  createdAt: product.created_at,

  updatedAt: product.updated_at,
});

/* ===========================================================
   Get Products
=========================================================== */

export const getProducts = async (
  params?: ProductQueryParams
): Promise<ProductListResponse> => {
  const { data } = await apiClient.get("/products", {
    params,
  });

  return {
    ...data,
    data: data.data.map(mapProduct),
  };
};

/* ===========================================================
   Get Product
=========================================================== */

export const getProduct = async (
  id: string
): Promise<ProductResponse> => {
  const { data } = await apiClient.get(`/products/${id}`);

  return {
    ...data,
    data: mapProduct(data.data),
  };
};

/* ===========================================================
   Create Product
=========================================================== */

export const createProduct = async (
  payload: CreateProductRequest
): Promise<ProductResponse> => {
  const { data } = await apiClient.post(
    "/products",
    payload
  );

  return {
    ...data,
    data: mapProduct(data.data),
  };
};

/* ===========================================================
   Update Product
=========================================================== */

export const updateProduct = async (
  id: string,
  payload: UpdateProductRequest
): Promise<ProductResponse> => {
  const { data } = await apiClient.patch(
    `/products/${id}`,
    payload
  );

  return {
    ...data,
    data: mapProduct(data.data),
  };
};

/* ===========================================================
   Delete Product
=========================================================== */

export const deleteProduct = async (
  id: string
): Promise<DeleteProductResponse> => {
  const { data } = await apiClient.delete(
    `/products/${id}`
  );

  return data;
};

/* ===========================================================
   Upload Product Image
=========================================================== */

export const uploadProductImage = async (
  productId: string,
  image: string
): Promise<ProductResponse> => {
  const formData = new FormData();

const file = {
  uri: image,
  name: `product-${Date.now()}.jpg`,
  type: "image/jpeg",
};

console.log("FILE OBJECT:", file);

formData.append("image", file as any);

  console.log("Uploading:", image);

  const { data } = await apiClient.post(
    `/products/${productId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return {
    ...data,
    data: mapProduct(data.data),
  };
};