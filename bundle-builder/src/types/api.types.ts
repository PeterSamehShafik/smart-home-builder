// 1. Base properties
export interface BaseProduct {
  id: string;
  title: string;
  description: string;
  badge: string | null;
}

// 2. Camera-specific structures
export interface CameraVariant {
  id: string;
  label: string;
  price: number;
  compareAt: number | null;
  thumbnailImage: string | null;
  heroImage: string | null;
}

export interface CameraProduct extends BaseProduct {
  category: "cameras";
  variants: CameraVariant[];
}

// 3. Standard Product structure (Sensors, Accessories, Plan)
export interface StandardProduct extends BaseProduct {
  category: "sensors" | "accessories" | "plan";
  mainImage: string | null;
  price: number;
  compareAt: number | null;
}

// 4. The combined Product type
export type Product = CameraProduct | StandardProduct;

// 5. The Cart Item type
// By explicitly separating these, you gain better autocompletion
// and prevent undefined errors when accessing variant data.
export interface CartItem {
  productId: string;
  variantId: string; // We use productId as variantId for non-cameras
  quantity: number;
  category: Product["category"];
}

export interface SummaryItem extends CartItem {
  product: Product;
  variant: CameraVariant | null; // Null for standard products
  totalPrice: number;
  compareAtPrice: number;
}

// 6. API Response
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
