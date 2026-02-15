/**
 * ============================================================================
 * FLOATING DOCK COMPONENT — SHELVED FOR NOW
 * ============================================================================
 *
 * This is a macOS-style floating dock navigation built with framer-motion.
 * It features hover magnification, tooltips, and an active indicator.
 *
 * WHY IT'S NOT BEING USED:
 * - The dock doesn't look great on this particular hidden research page.
 * - It takes up too much vertical space and isn't mobile-friendly enough.
 * - We plan to use this component on the main portfolio site later,
 *   where a dock-style nav would make more sense as a primary navigation.
 *
 * TO USE: Import FloatingDock and render it in your page. Pass currentView
 * and onNavigate props just like any nav component.
 *
 * Dependencies: framer-motion, next-themes, lucide-react
 * ============================================================================
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Home, BarChart3, Calculator, Sun, Moon } from "lucide-react";

// --- Dock Item with hover magnification ---

function DockItem({
  mouseX,
  children,
  onClick,
  isActive,
  tooltip,
}: {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  tooltip: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 200;
    return val - rect.x - rect.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [44, 64, 44]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div className="relative flex flex-col items-center">
      {hovered && (
        <motion.div
          className="absolute -top-10 px-2.5 py-1 rounded-md bg-card text-foreground text-xs font-medium border border-border shadow-lg whitespace-nowrap z-50"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
        >
          {tooltip}
        </motion.div>
      )}
      <motion.button
        ref={ref}
        style={{ width, height: width }}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex items-center justify-center rounded-xl transition-colors duration-200 ${
          isActive
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            : "bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
      >
        {children}
        {isActive && (
          <motion.div
            className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary"
            layoutId="dock-indicator"
          />
        )}
      </motion.button>
    </div>
  );
}

// --- Main Floating Dock ---

interface DockNavItem {
  id: string;
  emoji: string;
  shortName: string;
}

export function FloatingDock({
  currentView,
  onNavigate,
  fundItems,
}: {
  currentView: string;
  onNavigate: (view: string) => void;
  fundItems: DockNavItem[];
}) {
  const mouseX = useMotionValue(Infinity);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      className="fixed bottom-5 left-1/2 z-50"
      initial={{ y: 100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2 px-4 py-2.5 rounded-2xl bg-card/80 backdrop-blur-xl border border-border shadow-2xl shadow-black/20"
      >
        {/* Overview */}
        <DockItem
          mouseX={mouseX}
          onClick={() => onNavigate("dashboard")}
          isActive={currentView === "dashboard"}
          tooltip="Market Thesis"
        >
          <Home className="w-5 h-5" />
        </DockItem>
        <DockItem
          mouseX={mouseX}
          onClick={() => onNavigate("comparison")}
          isActive={currentView === "comparison"}
          tooltip="Comparative Analytics"
        >
          <BarChart3 className="w-5 h-5" />
        </DockItem>
        <DockItem
          mouseX={mouseX}
          onClick={() => onNavigate("calculator")}
          isActive={currentView === "calculator"}
          tooltip="Return Calculator"
        >
          <Calculator className="w-5 h-5" />
        </DockItem>

        {/* Separator */}
        <div className="w-px h-8 bg-border mx-1 self-center" />

        {/* Fund icons */}
        {fundItems.map((item) => (
          <DockItem
            key={item.id}
            mouseX={mouseX}
            onClick={() => onNavigate(item.id)}
            isActive={currentView === item.id}
            tooltip={item.shortName}
          >
            <span className="text-base leading-none">{item.emoji}</span>
          </DockItem>
        ))}

        {/* Separator */}
        <div className="w-px h-8 bg-border mx-1 self-center" />

        {/* Theme toggle */}
        <DockItem
          mouseX={mouseX}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          isActive={false}
          tooltip={
            mounted
              ? theme === "dark"
                ? "Light Mode"
                : "Dark Mode"
              : "Toggle Theme"
          }
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </DockItem>
      </motion.div>
    </motion.div>
  );
}
