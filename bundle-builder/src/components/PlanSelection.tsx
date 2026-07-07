import { useCheckoutStore } from "@/stores/checkoutStore";
import { usePlan } from "@/hooks/useProducts";
import { Check } from "lucide-react";

export function PlanSelection() {
  const { data: plans = [] } = usePlan();
  const cart = useCheckoutStore((state) => state.cart);
  const updateQuantity = useCheckoutStore((state) => state.updateQuantity);

  const currentActivePlanItem = Object.values(cart).find(
    (item) => item.category === "plan",
  );

  const handleSelectPlan = (productId: string) => {
    // 1. If we are clicking the one already selected, remove it (Toggle Off)
    if (currentActivePlanItem?.productId === productId) {
      updateQuantity(productId, productId, -currentActivePlanItem.quantity, "plan");
      return;
    }

    // 2. If a different plan is selected, remove it first
    if (currentActivePlanItem) {
      updateQuantity(currentActivePlanItem.productId, currentActivePlanItem.productId, -currentActivePlanItem.quantity, "plan");
    }

    // 3. Select the new one
    updateQuantity(productId, productId, 1, "plan");
  };

  if (!plans.length) {
    return <div className="p-4 text-center text-brand-primary text-sm font-bold">No plans for now...</div>;
  }

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans?.map((product) => {
          const isSelected = currentActivePlanItem?.productId === product.id;

          return (
            <div
              key={product.id}
              onClick={() => handleSelectPlan(product.id)}
              className={`border-2 rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all ${
                isSelected
                  ? "border-brand-primary bg-brand-primaryLight/30 ring-1 ring-brand-primary/10"
                  : "border-brand-border bg-brand-surface hover:border-slate-300"
              }`}
            >
              <div className="flex gap-4 items-start">
                {/* Product Image */}
                {product.mainImage && (
                  <img 
                    src={product.mainImage} 
                    alt={product.title} 
                    className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-slate-100" 
                  />
                )}
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-brand-textMain">
                      {product.title}
                    </h4>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? "bg-brand-primary border-brand-primary text-white" : "border-slate-300"
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-3" />}
                    </div>
                  </div>
                  <p className="text-brand-textMuted text-xs mt-1 leading-normal">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100/60 flex items-baseline gap-1.5">
                <span className="text-xl font-black text-brand-textMain">
                  ${product.price.toFixed(2)}/mo
                </span>
                {product.compareAt && (
                  <span className="text-xs text-brand-textRed line-through">
                    ${product.compareAt.toFixed(2)}/mo
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}