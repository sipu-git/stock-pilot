import { z } from "zod";

/* ===========================================================
   Product Schema
=========================================================== */

export const productSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Product name must be at least 2 characters.")
      .max(180, "Product name cannot exceed 180 characters."),

    sku: z
      .string()
      .trim()
      .min(1, "SKU is required.")
      .max(80, "SKU cannot exceed 80 characters."),

    categoryId: z
      .string()
      .uuid("Please select a valid category."),

    purchasePrice: z
      .number({
        required_error: "Purchase price is required.",
      })
      .min(0, "Purchase price cannot be negative."),

    sellingPrice: z
      .number({
        required_error: "Selling price is required.",
      })
      .min(0, "Selling price cannot be negative."),

    discount: z
      .number()
      .min(0, "Discount cannot be negative.")
      .default(0),

    tax: z
      .number()
      .min(0, "Tax cannot be negative.")
      .default(0),

    currentQuantity: z
      .number()
      .int()
      .min(0, "Quantity cannot be negative.")
      .default(0),

    minimumQuantity: z
      .number()
      .int()
      .min(0, "Minimum quantity cannot be negative.")
      .default(5),

    maximumQuantity: z
      .number()
      .int()
      .min(0, "Maximum quantity cannot be negative.")
      .default(100),

    description: z
      .string()
      .trim()
      .max(1000, "Description cannot exceed 1000 characters.")
      .optional(),
  })
  .refine(
    (data) => data.sellingPrice >= data.purchasePrice,
    {
      path: ["sellingPrice"],
      message:
        "Selling price should be greater than or equal to purchase price.",
    }
  )
  .refine(
    (data) =>
      data.maximumQuantity >= data.minimumQuantity,
    {
      path: ["maximumQuantity"],
      message:
        "Maximum quantity cannot be smaller than minimum quantity.",
    }
  );

/* ===========================================================
   Form Type
=========================================================== */

export type ProductFormData =
  z.infer<typeof productSchema>;