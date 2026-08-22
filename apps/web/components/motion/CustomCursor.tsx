"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursorStore } from "@/hooks/useMagneticCursor";
import { useIsMobile } from "@/hooks/useIsMobile";

export function CustomCursor() {
  const isMobile = useIsMobile();
  const { variant, cursorText } = useCursorStore();
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile, isVisible, mouseX, mouseY]);

  if (isMobile || !isVisible) return null;

  const variants = {
    default: {
      width: 14,
      height: 14,
      backgroundColor: "var(--accent-primary)",
      border: "0px solid transparent"
    },
    magnetic: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(99, 102, 241, 0.15)",
      border: "1px solid var(--accent-primary)"
    },
    text: {
      width: 72,
      height: 72,
      backgroundColor: "var(--text-primary)",
      color: "var(--bg-base)"
    },
    glow: {
      width: 32,
      height: 32,
      backgroundColor: "var(--accent-cyan)",
      boxShadow: "0 0 20px var(--accent-cyan)"
    },
    hidden: {
      opacity: 0,
      width: 0,
      height: 0
    }
  };

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full text-[10px] font-mono font-medium backdrop-blur-xs"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%"
      }}
      variants={variants}
      animate={variant}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {variant === "text" && cursorText}
    </motion.div>
  );
}
