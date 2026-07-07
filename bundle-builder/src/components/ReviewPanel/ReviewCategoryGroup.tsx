import type { Product, StandardProduct, SummaryItem } from "@/types/api.types";
import { QuantityStepper } from "../shared/QuantityStepper";

interface ReviewCategoryGroupProps {
  title: string;
  items: SummaryItem[];
  onQuantityChange: (
    productId: string,
    variantId: string,
    delta: number,
    category: Product["category"],
  ) => void;
}

export default function ReviewCategoryGroup({
  title,
  items,
  onQuantityChange,
}: ReviewCategoryGroupProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-2 border-t border-brand-border pt-3">
      <h4 className="text-xs font-bold tracking-wider text-brand-textMuted uppercase">
        {title}
      </h4>
      <div className="space-y-3">
        {items.map((item) => {
          const displayImage =
            item.category === "cameras"
              ? item.variant?.heroImage || item.variant?.thumbnailImage
              : (item.product as StandardProduct).mainImage;
          const isPlan = item.product.category === "plan";

          return (
            <div
              key={item.variantId}
              className="flex items-center justify-between gap-2 text-md"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-slate-50 rounded-md border border-brand-border shrink-0 p-1 flex items-center justify-center">
                  <img
                    src={displayImage || undefined}
                    alt={item.product.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className=" flex flex-col">
                  {isPlan ? (
                    <span className="font-bold">
                      <span className="text-brand-textMain">
                        {item.product.title.split(" ")[0]}
                      </span>{" "}
                      <span className="text-brand-primary">
                        {item.product.title.split(" ").slice(1).join(" ")}{" "}
                      </span>
                    </span>
                  ) : (
                    <span className="font-medium text-brand-textMain ">
                      {item.product.title}
                    </span>
                  )}
                  {!isPlan && item.variant && (
                    <span className="text-xs text-brand-textMuted leading-none mt-0.5">
                      Variant: {item.variant.label}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0  ">
                {!isPlan && (
                  <QuantityStepper
                    quantity={item.quantity}
                    size="sm"
                    bg="bg-brand-surface"
                    onIncrease={() =>
                      onQuantityChange(
                        item.productId,
                        item.variantId,
                        1,
                        item.product.category,
                      )
                    }
                    onDecrease={() =>
                      onQuantityChange(
                        item.productId,
                        item.variantId,
                        -1,
                        item.product.category,
                      )
                    }
                  />
                )}
                <div className="min-w-16 text-right flex flex-col">
                  {item.compareAtPrice !== item.totalPrice && (
                    <span className="text-brand-textMuted line-through">
                      ${item.compareAtPrice.toFixed(2)}
                      {isPlan && <>/mo</>}
                    </span>
                  )}

                  <span className="font-bold text-brand-primary">
                    {item.totalPrice === 0 ? (
                      <>FREE</>
                    ) : (
                      "$" + item.totalPrice.toFixed(2)
                    )}
                    {isPlan && <>/mo</>}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
