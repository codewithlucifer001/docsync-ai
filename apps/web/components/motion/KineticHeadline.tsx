"use client";

import React from "react";
import { motion } from "framer-motion";

interface KineticHeadlineProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

export function KineticHeadline({
  text,
  className = "",
  highlightWords = []
}: KineticHeadlineProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.04 * i }
    })
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      rotateX: 45,
      filter: "blur(6px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 120
      }
    }
  };

  return (
    <motion.h1
      className={`flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] font-extrabold tracking-tight ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(
          word.replace(/[^a-zA-Z0-9]/g, "")
        );
        return (
          <motion.span
            key={index}
            variants={childVariants}
            className={`inline-block ${
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
