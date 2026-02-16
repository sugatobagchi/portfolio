"use client";

import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Glossary of financial terms
const glossary: Record<string, string> = {
  NAV: "Net Asset Value — the price of one unit of a mutual fund. If NAV is ₹150 and you invest ₹15,000, you get 100 units.",
  CAGR: "Compound Annual Growth Rate — the smoothed annual return over a period, ignoring year-to-year ups and downs. The fairest way to compare investments.",
  SIP: "Systematic Investment Plan — investing a fixed amount monthly. Automatically buys more units when prices drop (rupee cost averaging).",
  "Lump Sum":
    "A one-time, big investment instead of spreading it over time. Works great when markets are low.",
  AUM: "Assets Under Management — total money managed by a fund. Higher AUM generally signals investor confidence.",
  XIRR: "Extended Internal Rate of Return — accounts for irregular cash flows to give a true annualized return for SIP investments.",
  "Expense Ratio":
    "Annual fee charged by the fund house, deducted from NAV daily. Lower is better — even 0.5% difference compounds hugely over 20 years.",
  Drawdown:
    "Peak-to-trough decline in fund value. A drawdown of -40% means the fund fell 40% from its highest point before recovering.",
  "Rupee Cost Averaging":
    "SIP's secret weapon — when prices fall, your fixed amount buys more units, lowering your average cost automatically.",
  Inflation:
    "The rate at which prices rise over time, reducing your money's purchasing power. India's avg CPI inflation is ~5-6%.",
  "Real Return":
    "Your return after subtracting inflation. If CAGR is 15% and inflation is 6%, your real return is ~9% — the actual wealth created.",
};

/**
 * Inline term with dotted underline and hover tooltip.
 * Usage: <Term t="CAGR" /> or <Term t="NAV">custom text</Term>
 */
export function Term({
  t,
  children,
}: {
  t: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    position: "top" | "bottom";
  } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const definition = glossary[t];

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const showBelow = rect.top < 120;
      setCoords({
        top: showBelow ? rect.bottom + 8 : rect.top - 8,
        left: rect.left + rect.width / 2,
        position: showBelow ? "bottom" : "top",
      });
    }
  }, [open]);

  if (!definition) {
    return <span>{children || t}</span>;
  }

  return (
    <span
      ref={ref}
      className="relative inline-flex items-center gap-0.5 cursor-help group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      role="button"
      aria-label={`${t}: ${definition}`}
    >
      <span className="border-b border-dotted border-muted-foreground/50 hover:border-primary/70 transition-colors">
        {children || t}
      </span>
      <Info className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary/60 transition-colors flex-shrink-0" />
      <AnimatePresence>
        {open && coords && (
          <motion.span
            initial={{
              opacity: 0,
              y: coords.position === "top" ? 4 : -4,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: coords.position === "top" ? 4 : -4,
            }}
            transition={{ duration: 0.15 }}
            className="fixed z-[9999] w-64 px-3 py-2.5 rounded-lg border border-border bg-popover text-popover-foreground shadow-xl text-[11px] leading-relaxed font-normal pointer-events-none"
            style={{
              top: coords.position === "top" ? coords.top : coords.top,
              left: coords.left,
              transform:
                coords.position === "top"
                  ? "translate(-50%, -100%)"
                  : "translate(-50%, 0)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span className="font-bold text-primary text-xs">{t}</span>
            <br />
            {definition}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
