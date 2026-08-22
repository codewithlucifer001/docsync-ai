"use client";

import React from "react";

export function MeshGradientBG({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden opacity-40 dark:opacity-30 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute -top-[25%] left-[20%] h-[450px] w-[450px] rounded-full bg-[var(--accent-primary)] opacity-40 blur-[120px] animate-pulse" />
      <div className="absolute top-[30%] -right-[10%] h-[400px] w-[400px] rounded-full bg-[var(--accent-cyan)] opacity-35 blur-[130px]" />
      <div className="absolute -bottom-[20%] left-[10%] h-[500px] w-[500px] rounded-full bg-violet-600 opacity-20 blur-[150px]" />
    </div>
  );
}
