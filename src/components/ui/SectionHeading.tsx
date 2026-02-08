"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export default function SectionHeading({
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <h2 className="section-heading text-gradient">{title}</h2>
      <div className="section-divider" />
    </motion.div>
  );
}
