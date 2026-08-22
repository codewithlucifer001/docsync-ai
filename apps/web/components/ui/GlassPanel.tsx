import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassPanel({
  children,
  className = "",
  glow = false,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={`rounded-2xl border ${
        glow ? "border-[var(--border-glow)] shadow-lg shadow-indigo-500/10" : "border-[var(--border-subtle)]"
      } bg-[var(--bg-surface)] backdrop-blur-xl transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}