import { useMemo } from "react";
import { useCheckoutStore } from "@/stores/checkoutStore";
import type { Product, SummaryItem } from "@/types/api.types";

export function useCheckoutSummary(products: Product[]) {
  const cart = useCheckoutStore((state) => state.cart);

  return useMemo(() => {
    let totalItems = 0;
    let subtotal = 0;
    let compareAtSubtotal = 0;

    const categorizedItems: Record<string, SummaryItem[]> = {
      cameras: [],
      sensors: [],
      accessories: [],
      plan: [],
    };

    Object.values(cart).forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return;

      let unitPrice = 0;
      let unitCompareAt = 0;
      let variant = null;

      if (product.category === "cameras") {
        variant = product.variants.find((v) => v.id === item.variantId);
        if (!variant) return;
        unitPrice = variant.price;
        unitCompareAt = variant.compareAt ?? variant.price;
      } else if (
        product.category === "sensors" ||
        product.category === "accessories" ||
        product.category === "plan"
      ) {
        unitPrice = product.price;
        unitCompareAt = product.compareAt ?? product.price;
      }

      totalItems += item.quantity;
      const itemTotalPrice = unitPrice * item.quantity;
      const itemCompareAtPrice = unitCompareAt * item.quantity;

      subtotal += itemTotalPrice;
      compareAtSubtotal += itemCompareAtPrice;

      if (categorizedItems[product.category]) {
        categorizedItems[product.category].push({
          ...item,
          product,
          variant,
          totalPrice: itemTotalPrice,
          compareAtPrice: itemCompareAtPrice,
        });
      }
    });

    const savings = Math.max(0, compareAtSubtotal - subtotal);

    return {
      totalItems,
      subtotal,
      compareAtSubtotal,
      savings,
      hasSavings: savings > 0,
      categorizedItems,
    };
  }, [cart, products]);
}
