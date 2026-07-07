// components/ProductCard.tsx
import { QuantityStepper } from "./QuantityStepper";
import type { Product } from "@/types/api.types";

interface ProductCardProps {
  product: Product;
  imageUrl: string | undefined;
  quantity: number;
  price: number;
  compareAtPrice: number | null;
  isHighlighted: boolean;
  // Variant Props (Optional)
  activeVariantId?: string;
  onVariantChange?: (variantId: string) => void;
  // Actions
  onQuantityChange: (delta: number) => void;
}

export function ProductCard({
  product,
  imageUrl,
  quantity,
  price,
  compareAtPrice,
  isHighlighted,
  activeVariantId,
  onVariantChange,
  onQuantityChange,
}: ProductCardProps) {
  // show variants ONLY if it's a camera and has > 1 variant
  const showVariants =
    product.category === "cameras" && product.variants.length > 1;

  return (
    <div
      className={`border-2 rounded-xl p-3 h-70 xl:h-46 w-36 xs:w-50 md:w-45 xl:w-96 bg-brand-surface relative flex flex-col xl:flex-row justify-center md:items-evenly gap-5 shadow-sm transition-all duration-200 ${
        isHighlighted
          ? "border-brand-primary ring-1 ring-brand-primary/10"
          : "border-brand-border hover:border-slate-300"
      }`}
    >
      {/* Image Slot */}
      <div className="w-16 xl:w-24 xl:h-full shrink-0 flex items-center justify-center relative border border-brand-border rounded-lg p-1.5 self-center">
        {product.badge && (
          <span className="absolute top-1 left-1 bg-brand-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md z-10 whitespace-nowrap">
            {product.badge}
          </span>
        )}
        <img
          src={imageUrl}
          alt={product.title}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Info Content */}
      <div className="flex flex-col justify-evenly flex-1 min-w-0 text-xs">
        <div>
          <h3 className="font-bold text-brand-textMain leading-tight truncate">
            {product.title}
          </h3>
          <p className="text-brand-textMuted leading-tight mt-0.5">
            {product.description}{" "}
            <a
              href="#"
              className="inline-block text-brand-primary font-medium underline underline-offset-2 hover:text-brand-primary/80"
            >
              Learn more
            </a>
          </p>
        </div>

        {showVariants && (
          <div className="flex flex-wrap gap-1 my-1 ">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => onVariantChange?.(v.id)}
                className={`border rounded-md p-1 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  v.id === activeVariantId
                    ? "border-brand-primary bg-brand-bg text-brand-textMain"
                    : "border-brand-border bg-brand-surface text-brand-textMuted hover:border-slate-300"
                }`}
              >
                <img
                  src={v.thumbnailImage || v.heroImage || ""}
                  alt={v.label}
                  className="w-3 md:w-5 h-3 md:h-5 object-contain bg-white rounded border border-slate-200"
                />
                <span className="truncate max-w-10">{v.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-brand-border text-xs md:text-md">
          <QuantityStepper
            size="sm"
            quantity={quantity}
            onIncrease={() => onQuantityChange(1)}
            onDecrease={() => onQuantityChange(-1)}
          />
          <div className="text-right leading-tight">
            {compareAtPrice && (
              <span className="text-xs text-brand-textRed line-through block leading-none mb-0.5">
                ${compareAtPrice.toFixed(2)}
              </span>
            )}
            <div className="text-md text-brand-textMuted block">
              {price === 0 ? (
                <span className="text-brand-primary">FREE</span>
              ) : (
                "$" + price.toFixed(2)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
