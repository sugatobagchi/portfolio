"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function GradientText({
  children,
  className = "",
  animate = false,
}: GradientTextProps) {
  if (animate) {
    return (
      <motion.span
        className={`text-gradient-animated ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    );
  }

  return <span className={`text-gradient ${className}`}>{children}</span>;
}
