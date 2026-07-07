export interface BaseProduct {
  id: string;
  title: string;
  description: string;
  badge: string | null;
}

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

export interface StandardProduct extends BaseProduct {
  category: "sensors" | "accessories" | "plan";
  mainImage: string | null;
  price: number;
  compareAt: number | null;
}

export type Product = CameraProduct | StandardProduct;

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  category: Product["category"];
}

export interface SummaryItem extends CartItem {
  product: Product;
  variant: CameraVariant | null;
  totalPrice: number;
  compareAtPrice: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
