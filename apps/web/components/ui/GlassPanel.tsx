"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useCursorStore } from "@/hooks/useMagneticCursor";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  glowOnHover?: boolean;
}

export function GlassPanel({
  children,
  className,
  interactive = false,
  glowOnHover = false,
  ...props
}: GlassPanelProps) {
  const { setVariant, resetVariant } = useCursorStore();

  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-md)] border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 backdrop-blur-[var(--blur-panel)] transition-all duration-300",
        interactive && "cursor-pointer active:scale-[0.98]",
        glowOnHover && "hover:border-[var(--border-glow)] hover:shadow-lg hover:shadow-indigo-500/10",
        className
      )}
      onMouseEnter={() => {
        if (interactive) setVariant("magnetic");
      }}
      onMouseLeave={() => {
        if (interactive) resetVariant();
      }}
      {...props}
    >
      {children}
    </div>
  );
}
