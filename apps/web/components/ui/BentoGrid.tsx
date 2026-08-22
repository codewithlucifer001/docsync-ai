"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-[240px]", className)}>
      {children}
    </div>
  );
}

interface BentoTileProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "1x1" | "2x1" | "2x2" | "3x1";
}

export function BentoTile({
  children,
  size = "1x1",
  className,
  ...props
}: BentoTileProps) {
  const sizeClasses = {
    "1x1": "col-span-1 row-span-1",
    "2x1": "col-span-1 md:col-span-2 row-span-1",
    "2x2": "col-span-1 md:col-span-2 row-span-2",
    "3x1": "col-span-1 md:col-span-3 row-span-1"
  };

  return (
    <div className={cn("h-full w-full", sizeClasses[size], className)} {...props}>
      {children}
    </div>
  );
}
