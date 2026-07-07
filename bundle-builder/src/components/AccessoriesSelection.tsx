import { useCheckoutStore } from "@/stores/checkoutStore";
import { useAccessories } from "@/hooks/useProducts";
import { ProductCard } from "./shared/ProductCard";

export function AccessoriesGrid() {
  const { data: accessories = [] } = useAccessories();
  const cart = useCheckoutStore((state) => state.cart);
  const updateQuantity = useCheckoutStore((state) => state.updateQuantity);

  if (!accessories.length) {
    return (
      <div className="p-4 text-center text-brand-primary text-sm font-bold">
        No accessories for now...
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-3 justify-start w-full">
        {accessories.map((product) => {
          const currentQty = cart[product.id]?.quantity || 0;
          return (
            <ProductCard
              key={product.id}
              product={product}
              imageUrl={product.mainImage || undefined}
              quantity={currentQty}
              price={product.price}
              compareAtPrice={product.compareAt} // Calculate similarly to price
              isHighlighted={currentQty > 0}
              onQuantityChange={(delta) =>
                updateQuantity(product.id, product.id, delta, product.category)
              }
            />
          );
        })}
      </div>
    </div>
  );
}
