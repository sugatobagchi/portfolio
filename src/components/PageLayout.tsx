"use client";

import { useTheme } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";
import { useEffect, useState } from "react";
import { features } from "@/config/features";
import { motion } from "framer-motion";

interface PageLayoutProps {
  children: React.ReactNode;
  themeTogglePosition?: "left" | "right";
}

export default function PageLayout({ children, themeTogglePosition = "right" }: PageLayoutProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => setTheme(theme === "dark" ? "light" : "dark");

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  const navItems = features.filter((feature) => feature.enabled);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header navItems={navItems} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingThemeToggle
        theme={theme ?? "dark"}
        onToggle={handleThemeToggle}
        position={themeTogglePosition}
      />
    </div>
  );
}
