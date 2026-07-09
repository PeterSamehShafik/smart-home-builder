import { Sun, Moon } from "lucide-react";
import icon from "@/assets/brand-ico.png";
import { useThemeStore } from "@/stores/themeStore";

export function Navbar() {
  const { isDark, toggleTheme } = useThemeStore();
  return (
    <nav className="bg-brand-header border-b border-brand-border px-6 py-4 flex justify-between items-center">
      <img src={icon} alt="Logo" className="w-8" />

      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg cursor-pointer bg-brand-secondary text-brand-primary"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </nav>
  );
}
