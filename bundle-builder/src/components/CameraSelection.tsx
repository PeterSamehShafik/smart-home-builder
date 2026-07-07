import { useCheckoutStore } from "@/stores/checkoutStore";
import { useCameras } from "@/hooks/useProducts";
import { ProductCard } from "./shared/ProductCard";

export function CameraSelection() {
  const { data: cameras = [] } = useCameras();
  const cart = useCheckoutStore((state) => state.cart);
  const activeVariants = useCheckoutStore((state) => state.activeVariants);
  const updateQuantity = useCheckoutStore((state) => state.updateQuantity);
  const setActiveVariant = useCheckoutStore((state) => state.setActiveVariant);

  if (!cameras.length) {
    return (
      <div className="p-2 xl:p-4 text-center text-sm">
        No cameras for now...
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 w-full justify-center">
      {cameras.map((product) => {
        const defaultVariantId = product.variants[0]?.id || "";
        const activeVariantId = activeVariants[product.id] || defaultVariantId;
        const currentVariantQuantity = cart[activeVariantId]?.quantity || 0;

        const isAnyVariantInCart = Object.values(cart).some(
          (item) => item.productId === product.id,
        );

        const activeVariant =
          product.variants.find((v) => v.id === activeVariantId) ||
          product.variants[0];
        const displayHeroImage =
          activeVariant.heroImage || activeVariant.thumbnailImage || undefined;
        const price = activeVariant.price;
        const compareAtPrice = activeVariant.compareAt;

        return (
          <ProductCard
            key={product.id}
            product={product}
            imageUrl={displayHeroImage}
            quantity={currentVariantQuantity}
            price={price}
            compareAtPrice={compareAtPrice} // Calculate similarly to price
            isHighlighted={isAnyVariantInCart}
            activeVariantId={activeVariantId}
            onVariantChange={(vId) => setActiveVariant(product.id, vId)}
            onQuantityChange={(delta) =>
              updateQuantity(
                product.id,
                activeVariantId || product.id,
                delta,
                product.category,
              )
            }
          />
        );
      })}
    </div>
  );
}
