import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem } from "@/types/api.types";

interface CheckoutState {
  cart: Record<string, CartItem>;
  activeVariants: Record<string, string>; // productId -> variantId
  activeStep: number;
  setActiveStep: (step: number) => void;
  updateQuantity: (
    productId: string,
    variantId: string,
    delta: number,
    category: Product["category"],
  ) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  resetCart: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      cart: {},
      activeVariants: {},
      activeStep: 1,

      setActiveStep: (step) => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return set({ activeStep: step });
      },

      setActiveVariant: (productId, variantId) =>
        set((state) => ({
          activeVariants: { ...state.activeVariants, [productId]: variantId },
        })),

      updateQuantity: (productId, variantId, delta, category) =>
        set((state) => {
          const current = state.cart[variantId] || {
            productId,
            variantId,
            quantity: 0,
            category,
          };

          const nextQuantity = Math.max(0, current.quantity + delta);
          const updatedCart = { ...state.cart };

          if (nextQuantity === 0) {
            delete updatedCart[variantId];
          } else {
            updatedCart[variantId] = { ...current, quantity: nextQuantity };
          }
          return { cart: updatedCart };
        }),

      resetCart: () => set({ cart: {}, activeVariants: {} }),
    }),
    {
      name: "security-bundle-storage",
      partialize: (state) => ({
        cart: state.cart,
        activeVariants: state.activeVariants,
      }),
    },
  ),
);
