"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingThemeToggleProps {
  theme: string;
  onToggle: () => void;
}

export default function FloatingThemeToggle({
  theme,
  onToggle,
}: FloatingThemeToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          aria-label="Toggle Theme"
          onClick={onToggle}
          className="w-12 h-12 rounded-full shadow-lg bg-card border-border/50 hover:shadow-xl hover:shadow-primary/20 transition-all"
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="h-5 w-5 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="h-5 w-5 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </motion.div>
  );
}
