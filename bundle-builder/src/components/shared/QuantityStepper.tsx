import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  disabled?: boolean;
  size?: "sm" | "md";
  onIncrease?: () => void;
  onDecrease?: () => void;
  bg?: string;
}

export function QuantityStepper({
  quantity,
  disabled = false,
  size = "md",
  onIncrease,
  onDecrease,
  bg="bg-brand-bg",
}: QuantityStepperProps) {
  const isSm = size === "sm";

  return (
    <div
      className={`flex items-center rounded-lg ${disabled ? "opacity-50" : ""}`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={onDecrease}
        className={`${isSm ? "p-1" : "p-1.5"} ${bg} hover:bg-brand-primaryHover text-brand-textMuted rounded-l-lg disabled:cursor-not-allowed cursor-pointer`}
      >
        <Minus className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </button>

      <span
        className={`${isSm ? "px-3 text-xs" : "px-2.5 text-xs"} font-bold text-brand-textMain min-w-4 text-center`}
      >
        {quantity}
      </span>

      <button
        type="button"
        disabled={disabled}
        onClick={onIncrease}
        className={`${isSm ? "p-1" : "p-1.5"} ${bg} hover:bg-brand-primaryHover text-brand-textMuted rounded-r-lg disabled:cursor-not-allowed cursor-pointer`}
      >
        <Plus className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </button>
    </div>
  );
}
