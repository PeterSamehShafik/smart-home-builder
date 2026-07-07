import { type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  isOpen: boolean;
  selectedCount?: number;
  icon: ReactNode;
  children?: ReactNode;
  onToggle?: () => void;
}

export function AccordionStep({
  stepNumber,
  totalSteps,
  title,
  isOpen,
  selectedCount = 0,
  icon,
  children,
  onToggle,
}: AccordionStepProps) {
  return (
    <div className="overflow-hidden rounded">
      {/* Header */}
      <span
        className={`text-xs tracking-wider  text-brand-textMuted uppercase block px-5 pb-1 pt-0 md:py-2 ${isOpen && "md:bg-brand-secondary"}`}
      >
        Step {stepNumber} of {totalSteps}
      </span>
      <div
        onClick={onToggle}
        className={`px-5 py-4 flex items-center justify-between border-slate-500 cursor-pointer transition-colors ${isOpen ? "bg-brand-secondary border-t" : "border-y hover:bg-brand"}`}
      >
        <div className="flex items-center gap-3">
          <div className=" shadow-sm text-brand-textMuted">{icon}</div>
          <div>
            <h2
              className={`font-bold ${isOpen ? "text-lg text-brand-textMain" : "text-base text-brand-textMuted"}`}
            >
              {title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
          {selectedCount > 0 && <span>{selectedCount} selected</span>}
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-brand-primary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-brand-primary" />
          )}
        </div>
      </div>

      {/* Expanded Content Box */}
      {isOpen && (
        <div className="bg-brand-secondary p-2">{children}</div>
      )}
    </div>
  );
}
