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
  Alpha:
    "How much EXTRA return a fund generates over its benchmark index. +2% alpha means the manager beat the market by 2%. Consistent alpha over 10+ years is rare and valuable.",
  Beta: "Measures volatility vs the market. Beta = 1 means it moves with the market. Beta > 1 = more volatile. Beta < 1 = less volatile. Conservative investors prefer beta < 1.",
  "Large Cap":
    "Funds investing in the top 100 companies by market size (e.g., Reliance, TCS, HDFC Bank). Safer and more stable, but slower growth. Great for core portfolio.",
  "Flexi Cap":
    "Funds that can invest across large, mid, and small companies without restrictions. Gives the fund manager freedom to move money where opportunities are best.",
  "Mid Cap":
    "Funds investing in companies ranked 101-250 by size. Higher growth potential than large caps but more volatile. Where real wealth creation happens over 15-20 years.",
  Nifty:
    "Nifty 50 — India's benchmark stock index tracking the top 50 companies. If a fund can't beat Nifty consistently, you're better off with a simple index fund.",
  Benchmark:
    "A standard index (like Nifty 50) used to measure a fund's performance. If Nifty returned 12% and your fund returned 10%, it underperformed.",
  "Risk Profile":
    "How wild the ride gets. Low = stable like FD. Moderate = some ups and downs. High = can drop 30-40% in crashes but delivers best long-term returns.",
  "Resilience Score":
    "How quickly a fund recovers after a market crash. High resilience = the fund bounced back to pre-crash levels within 18-24 months of major crashes.",
  "Exit Load":
    "A penalty fee for withdrawing early, usually 1% if you sell within 1 year. After that, most equity funds are free to exit.",
  "MNC Fund":
    "Invests in multinational companies listed in India (like HUL, Nestlé, Siemens). Gives indirect international exposure with Indian tax treatment.",
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
