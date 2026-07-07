import { useCheckoutStore } from "@/stores/checkoutStore";
import { useCheckoutSummary } from "@/hooks/useCheckoutSummary";
import satisfaction from "@/assets/satisfaction.png";
import ReviewCategoryGroup from "./ReviewCategoryGroup";
import type { Product } from "@/types/api.types";
import { Truck } from "lucide-react";

interface ReviewPanelProps {
  allProducts: Product[];
}
export function ReviewPanel({ allProducts }: ReviewPanelProps) {
  const updateQuantity = useCheckoutStore((state) => state.updateQuantity);

  const {
    totalItems,
    subtotal,
    compareAtSubtotal,
    savings,
    hasSavings,
    categorizedItems,
  } = useCheckoutSummary(allProducts);

  return (
    <div className="relative bg-brand-secondary rounded-2xl border border-brand-border shadow-sm p-6 flex flex-col gap-5 md:flex-row xl:flex-col justify-between w-full">
      <span className="text-brand-textMuted text-xs  absolute top-2 left-5">
        REVIEW
      </span>
      <div className="mt-2 ">
        <h2 className="text-xl font-bold text-brand-textMain">
          Your security system
        </h2>
        <p className="text-brand-textMuted text-xs mt-1">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>

        {totalItems === 0 ? (
          <div className="text-center py-12 text-brand-textMuted text-xs font-medium border-2 border-dashed border-slate-100 rounded-xl mt-6">
            Your basket is empty.
            <p className="text-xs text-slate-400 font-normal mt-1">
              Select equipment below to build your bundle.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {/* 1. CAMERAS CATEGORY GROUP SECTION */}
            <ReviewCategoryGroup
              title="Cameras"
              items={categorizedItems.cameras}
              onQuantityChange={updateQuantity}
            />

            {/* 2. SENSORS CATEGORY GROUP SECTION */}
            <ReviewCategoryGroup
              title="Sensors"
              items={categorizedItems.sensors}
              onQuantityChange={updateQuantity}
            />

            {/* 3. ACCESSORIES CATEGORY GROUP SECTION */}
            <ReviewCategoryGroup
              title="Accessories"
              items={categorizedItems.accessories}
              onQuantityChange={updateQuantity}
            />

            {/* 4. PLANS / SUBSCRIPTIONS CATEGORY GROUP SECTION */}
            <ReviewCategoryGroup
              title="Home Monitoring Plan"
              items={categorizedItems.plan}
              onQuantityChange={updateQuantity}
            />

            {/* Shipping Line-item block remains static status view */}
            <div className="flex justify-between  border-t border-brand-border pt-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-surface rounded shrink-0 p-1 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-brand-success" />
                </div>
                <div className="flex flex-col ">
                  <span className="font-medium text-md text-brand-textMain ">
                    Fast Shipping
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-brand-textMuted line-through">$5.99</span>
                <span className="text-brand-primary font-bold">FREE</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Calculations Footer Panel section */}
      {totalItems > 0 && (
        <div className="mt-3 pt-3 border-t border-brand-border space-y-4 w-auto md:w-xl xl:w-auto px-0 md:px-8 xl:px-0">
          {/* Pricing Header: Responsive Container */}
          <div className="flex flex-row md:flex-col xl:flex-row items-center md:items-start xl:items-center justify-between gap-4 ">
            {/* Badge + Text Section */}
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <img
                  src={satisfaction}
                  alt="100% Satisfaction Guarantee"
                  className="w-20 h-20 object-contain md:w-30 md:h-30 xl:w-20 xl:h-20"
                />
              </div>

              {/* This Text Block Only Shows on MD/LG screens */}
              <div className="hidden md:block xl:hidden ">
                <h4 className="font-bold text-lg text-brand-textMain">
                  30-day hassle-free returns
                </h4>
                <p className="text-md text-brand-textMuted mt-0.5 leading-tight">
                  If you're not totally in love with the product, we will refund
                  you 100%.
                </p>
              </div>
            </div>

            {/* Pricing Column */}
            <div className="text-right block md:flex xl:block w-full  justify-between items-center">
              {/* Monthly Financing Badge */}
              <span className="inline-block bg-brand-primary text-white text-xs px-2 py-0.5 rounded uppercase tracking-wide mb-1">
                as low as ${(subtotal / 12).toFixed(2)}/mo
              </span>

              {/* Main Price Row */}
              <div className="flex items-baseline justify-end gap-2">
                {hasSavings && (
                  <span className="text-base text-brand-textMuted line-through font-medium">
                    ${compareAtSubtotal.toFixed(2)}
                  </span>
                )}
                <span className="text-2xl font-bold text-brand-primary">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Savings Alert */}
          {hasSavings && (
            <p className="text-center text-xs font-semibold text-brand-success py-1 mb-2">
              Congrats! You're saving ${savings.toFixed(2)} on your security
              bundle!
            </p>
          )}

          {/* Checkout Section */}
          <div className="space-y-1">
            <button className="w-full bg-brand-primary text-white font-black py-4 rounded shadow-lg shadow-indigo-600/20 hover:bg-brand-primaryHover active:scale-[0.99] transition-all text-sm text-center cursor-pointer">
              Checkout
            </button>
            <button className="w-full text-brand-textMuted underline italic text-xs font-medium hover:underline text-center cursor-pointer">
              Save my system for later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
