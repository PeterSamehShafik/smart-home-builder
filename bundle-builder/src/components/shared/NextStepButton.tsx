import { useCheckoutStore } from "@/stores/checkoutStore";

interface NextStepButtonProps {
  step: number;
  label: string;
}

export default function NextStepButton({ step, label }: NextStepButtonProps) {
  const setActiveStep = useCheckoutStore((state) => state.setActiveStep);

  return (
    <button
      type="button"
      onClick={() => setActiveStep(step)}
      className="
        bg-transparent
        border-2
        border-brand-primary
        text-brand-primary
        font-bold
        px-5
        py-1
        rounded-xl
        text-sm
        hover:bg-brand-primaryLight
        hover:border-brand-primaryHover
        hover:text-brand-primaryHover
        transition-all
        duration-200
        active:scale-[0.98]
        cursor-pointer
        w-full sm:w-auto
      "
    >
      {label}
    </button>
  );
}
