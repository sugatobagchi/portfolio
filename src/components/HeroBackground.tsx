"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${i % 2 === 0 ? "rounded-full" : "rotate-45"}`}
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 4) * 18}%`,
            width: `${8 + (i % 3) * 4}px`,
            height: `${8 + (i % 3) * 4}px`,
            backgroundColor:
              i % 3 === 0
                ? "rgba(59, 130, 246, 0.3)"
                : i % 3 === 1
                  ? "rgba(139, 92, 246, 0.3)"
                  : "rgba(236, 72, 153, 0.2)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            opacity: [0.2, 0.8, 0.2],
            rotate: i % 2 === 0 ? [0, 360] : [45, 405],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      <motion.div
        className="absolute w-20 h-[1px] bg-gradient-to-r from-primary via-primary to-transparent"
        initial={{ x: -100, y: 100, opacity: 0 }}
        animate={{
          x: ["-10%", "120%"],
          y: ["10%", "40%"],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
      />
      <motion.div
        className="absolute w-16 h-[1px] bg-gradient-to-r from-accent via-accent to-transparent"
        initial={{ x: -100, y: 200, opacity: 0 }}
        animate={{
          x: ["-5%", "110%"],
          y: ["30%", "55%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 8,
          delay: 3,
        }}
      />
    </div>
  );
}
