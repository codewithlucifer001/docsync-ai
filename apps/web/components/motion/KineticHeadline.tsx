"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface KineticHeadlineProps {
  text: string;
  highlightWords?: string[];
  className?: string;
}

export function KineticHeadline({
  text,
  highlightWords = [],
  className = ""
}: KineticHeadlineProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -40,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 14,
        stiffness: 100
      }
    }
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`font-extrabold tracking-tight perspective-1000 ${className}`}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(word);
        return (
          <motion.span
            key={index}
            variants={childVariants}
            className={`inline-block mr-[0.25em] ${
              isHighlighted
                ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-cyan)] bg-clip-text text-transparent"
                : "text-[var(--text-primary)]"
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}