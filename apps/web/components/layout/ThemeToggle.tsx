"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Eye } from "lucide-react";

type Theme = "dark" | "light" | "high-contrast";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("high-contrast");
    else setTheme("dark");
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-glow)] active:scale-95"
      aria-label="Toggle visual theme"
    >
      {theme === "dark" && <Moon className="h-3.5 w-3.5 text-[var(--accent-primary)]" />}
      {theme === "light" && <Sun className="h-3.5 w-3.5 text-amber-500" />}
      {theme === "high-contrast" && <Eye className="h-3.5 w-3.5 text-[var(--accent-cyan)]" />}
      <span className="capitalize">{theme}</span>
    </button>
  );
}
