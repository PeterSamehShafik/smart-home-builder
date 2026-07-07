import { useCheckoutStore } from "@/stores/checkoutStore";
import { useSensors } from "@/hooks/useProducts";
import { ProductCard } from "./shared/ProductCard";

export function SensorsGrid() {
  const { data: sensors = [] } = useSensors();
  const cart = useCheckoutStore((state) => state.cart);
  const updateQuantity = useCheckoutStore((state) => state.updateQuantity);

  if (!sensors.length) {
    return (
      <div className="p-4 text-center text-brand-primary text-sm font-bold">
        No sensors for now...
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-3 justify-start w-full">
        {sensors.map((product) => {
          // Use product.id as the key since there are no variants
          const currentQty = cart[product.id]?.quantity || 0;
          return (
            <ProductCard
              key={product.id}
              product={product}
              imageUrl={product.mainImage || undefined}
              quantity={currentQty}
              price={product.price}
              compareAtPrice={product.compareAt}
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
