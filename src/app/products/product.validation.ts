import { z } from "zod";

// Zod schema for TVariant
const TVariantSchema = z.object({
  type: z.string(),
  value: z.string()
});

// Zod schema for Inventory
const InventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean()
});

// Zod schema for Products
const ProductsValidateSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(TVariantSchema),
  inventory: InventorySchema
});

// Export the Zod schemas
export {  ProductsValidateSchema };
