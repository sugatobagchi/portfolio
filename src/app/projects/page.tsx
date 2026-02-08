"use client";

import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Lightbulb, Sparkles, Rocket, Code2, Brain } from "lucide-react";

export default function ProjectsPage() {
  return (
    <PageLayout>
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Brain Icon */}
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
              <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
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
            Under <span className="text-primary">Construction</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8"
          >
            My mind is still brainstorming...
          </motion.p>

          {/* Animated idea bubbles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
          >
            {[
              { icon: Lightbulb, label: "Ideas forming" },
              { icon: Code2, label: "Code brewing" },
              { icon: Rocket, label: "Launch soon" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.15 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                >
                  <item.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Loading bar animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading creativity...
              </motion.span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: ["0%", "60%", "40%", "75%", "50%"] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-muted-foreground"
          >
            Check back soon — amazing projects are on the way! 🚀
          </motion.p>
        </div>
      </div>
    </PageLayout>
  );
}
