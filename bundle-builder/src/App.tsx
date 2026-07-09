import { Camera, Layers, Shield, Sliders } from "lucide-react";
import { AccordionStep } from "@/components/shared/AccordionStep";
import { CameraSelection } from "@/components/CameraSelection";
import { PlanSelection } from "@/components/PlanSelection";
import { ReviewPanel } from "@/components/ReviewPanel/ReviewPanel";
import { AccessoriesGrid } from "@/components/AccessoriesSelection";
import { SensorsGrid } from "@/components/SensorsSelection";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { useCheckoutSummary } from "@/hooks/useCheckoutSummary";
import NextStepButton from "./components/shared/NextStepButton";
import { useAllProducts } from "./hooks/useProducts";
import type { SummaryItem } from "./types/api.types";
import { SkeletonLoader } from "./components/shared/SkeletonLoader";

export default function App() {
  const activeStep = useCheckoutStore((state) => state.activeStep);
  const setActiveStep = useCheckoutStore((state) => state.setActiveStep);

  // Aggregated data for summary/cart logic only
  const { data: allProducts, isLoading } = useAllProducts();
  const { categorizedItems } = useCheckoutSummary(allProducts);

  const toggleStep = (step: number) => {
    setActiveStep(activeStep === step ? 0 : step);
  };

  const getSelectedCount = (itemsArray: SummaryItem[]) => {
    if (!itemsArray) return 0;
    const uniqueProductIds = new Set(itemsArray.map((item) => item.productId));
    return uniqueProductIds.size;
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-brand-bg py-2 md:pb-12 font-sans antialiased text-brand-textMain">
      <div className="max-w-360 mx-auto flex flex-col xl:flex-row justify-center items-start gap-7 md:pt-5 pt-3 px-0 md:px-6">
        <div className="md:hidden flex justify-center w-full text-4xl font-bold">
          <h2>Let's get started!</h2>
        </div>
        {/* CONFIGURATOR PANEL */}
        <div className="w-full xl:w-4xl flex flex-col md:gap-3">
          <AccordionStep
            stepNumber={1}
            totalSteps={4}
            title="Choose your cameras"
            isOpen={activeStep === 1}
            onToggle={() => toggleStep(1)}
            selectedCount={getSelectedCount(categorizedItems.cameras)}
            icon={<Camera className="w-5 h-5" />}
          >
            <CameraSelection />
            <div className="mt-3 pt-3 pb-1 border-t border-brand-border flex justify-center">
              <NextStepButton step={2} label="Next: Choose your plan" />
            </div>
          </AccordionStep>

          <AccordionStep
            stepNumber={2}
            totalSteps={4}
            title="Choose your plan"
            isOpen={activeStep === 2}
            onToggle={() => toggleStep(2)}
            selectedCount={getSelectedCount(categorizedItems.plan)}
            icon={<Layers className="w-5 h-5" />}
          >
            <PlanSelection />
            <div className="mt-3 pt-3 pb-1 border-t border-brand-border flex justify-center">
              <NextStepButton step={3} label="Next: Choose your sensors" />
            </div>
          </AccordionStep>

          <AccordionStep
            stepNumber={3}
            totalSteps={4}
            title="Choose your sensors"
            isOpen={activeStep === 3}
            onToggle={() => toggleStep(3)}
            selectedCount={getSelectedCount(categorizedItems.sensors)}
            icon={<Sliders className="w-5 h-5" />}
          >
            <SensorsGrid />
            <div className="mt-3 pt-3 pb-1 border-t border-brand-border flex justify-center">
              <NextStepButton step={4} label="Next: Add Extra protection" />
            </div>
          </AccordionStep>

          <AccordionStep
            stepNumber={4}
            totalSteps={4}
            title="Add extra protection"
            isOpen={activeStep === 4}
            onToggle={() => toggleStep(4)}
            selectedCount={getSelectedCount(categorizedItems.accessories)}
            icon={<Shield className="w-5 h-5" />}
          >
            <AccessoriesGrid />
          </AccordionStep>
        </div>

        {/* SIDEBAR REVIEW */}
        <div className="w-full xl:w-96 ">
          <ReviewPanel allProducts={allProducts} />
        </div>
      </div>
    </div>
  );
}
