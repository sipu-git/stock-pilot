import { Category } from "../features/categories/types";
import { InventoryTransaction } from "../features/inventory/types";
import { Product, ProductStatus } from "../features/products/types";


export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  DashboardHome: undefined;
};

export type CategoryStackParamList = {
  CategoryList: undefined;
  AddCategory: undefined;

  EditCategory: {
    category: Category;
  };
};

export type ProductStackParamList = {
ProductList: {
  status?: ProductStatus;
};
  AddProduct: undefined;

  EditProduct: {
    productId: string;
  };

  ProductDetails: {
    productId: string;
  };
  UpdateStock: {
    productId: string;
  };
  InventoryHistory: undefined;

  TransactionDetails: {
    transaction: InventoryTransaction;
  };
};

export type SettingsStackParamList = {
  SettingsHome: undefined;

  Profile: undefined;

  EditProfile: undefined;

  ChangePassword: undefined;

  PrivacyPolicy: undefined;

  TermsConditions: undefined;

  About: undefined;

  Legal: {
  title: string;
  content: string;
};
};


export type ReportStackParamList = {
  ReportsHome: undefined;

  InventoryValuation: undefined;

  CategoryReport: undefined;

  ProductReport: undefined;
};