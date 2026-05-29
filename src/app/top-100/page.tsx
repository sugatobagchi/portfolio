"use client";

import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { ListTodo, Sparkles, Plane, Trophy, Mountain } from "lucide-react";
import { notFound } from "next/navigation";

export default function Top100Page() {
  notFound();
  return (
    <PageLayout>
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Bucket List Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 60px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
            >
              <ListTodo className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </motion.div>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                  x: [0, (i % 2 === 0 ? 1 : -1) * 30 * Math.random()],
                  y: [0, -40 - i * 10],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute top-1/2 left-1/2"
              >
                <Sparkles className="w-4 h-4 text-primary/60" />
              </motion.div>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            My <span className="text-primary">Top 100</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto"
          >
            I&apos;m building my bucket list and will be updated soon!
          </motion.p>

          {/* Animated icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {[
              { icon: Plane, label: "Travel" },
              { icon: Trophy, label: "Goals" },
              { icon: Mountain, label: "Adventure" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.7 + i * 0.15,
                }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="flex flex-col items-center gap-3 p-4 sm:p-6 rounded-2xl bg-muted/40 hover:bg-muted/60 transition-colors border border-transparent hover:border-primary/20"
                title={item.label}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <item.icon className="w-8 h-8 text-primary" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Stay tuned for the list! 📋
          </motion.p>
        </div>
      </div>
    </PageLayout>
  );
}
