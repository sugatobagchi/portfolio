"use client";

import { useState, useMemo, useRef, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Percent,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import { fundDB, fundIds } from "./fundData";
import { Term } from "./Term";

function formatCurrency(n: number) {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  if (n >= 1000) return "₹" + (n / 1000).toFixed(1) + "k";
  return "₹" + n.toFixed(0);
}

// --- TOGGLE SWITCH ---

function ToggleSwitch({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="flex items-center gap-2.5 group cursor-pointer"
      aria-label={label}
    >
      <div
        className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${enabled ? "bg-primary" : "bg-secondary"}`}
      >
        <motion.div
          className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm"
          animate={{ left: enabled ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      <span
        className={`text-xs font-medium transition-colors ${enabled ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
      >
        {label}
      </span>
    </button>
  );
}

/**
 * Linearly interpolate monthly NAV from yearly NAV data.
 * If yearlyData has N points (year 0..N-1), we produce (N-1)*12 monthly points.
 */
function interpolateMonthlyNav(yearlyData: number[]): number[] {
  const monthly: number[] = [];
  for (let y = 0; y < yearlyData.length - 1; y++) {
    const startNav = yearlyData[y];
    const endNav = yearlyData[y + 1];
    for (let m = 0; m < 12; m++) {
      monthly.push(startNav + (endNav - startNav) * (m / 12));
    }
  }
  // Add the very last data point
  monthly.push(yearlyData[yearlyData.length - 1]);
  return monthly;
}

/** Deflate a nominal value to today's purchasing power */
function deflate(
  nominal: number,
  years: number,
  inflationRate: number,
): number {
  if (inflationRate <= 0 || years <= 0) return nominal;
  return nominal / Math.pow(1 + inflationRate / 100, years);
}

export function CalculatorView() {
  const [selectedFundId, setSelectedFundId] = useState("hdfc-flexi");
  const [mode, setMode] = useState<"lumpsum" | "sip">("sip");
  const [amount, setAmount] = useState(1000);
  const [tenure, setTenure] = useState(15);
  const [stopEnabled, setStopEnabled] = useState(false);
  const [stopValue, setStopValue] = useState(5);
  const [stopUnit, setStopUnit] = useState<"years" | "months">("years");
  const [skipEnabled, setSkipEnabled] = useState(false);
  const [skipFrom, setSkipFrom] = useState(3);
  const [skipTo, setSkipTo] = useState(5);
  const [skipUnit, setSkipUnit] = useState<"years" | "months">("years");
  const [inflationEnabled, setInflationEnabled] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedWindow, setExpandedWindow] = useState<number | null>(null);
  const [breakdownView, setBreakdownView] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fund = fundDB[selectedFundId];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Convert stop/skip to months for uniform calculation
  const stopAfterMonths = stopEnabled
    ? stopUnit === "years"
      ? stopValue * 12
      : stopValue
    : null;
  const skipFromMonth = skipEnabled
    ? skipUnit === "years"
      ? (skipFrom - 1) * 12
      : skipFrom - 1
    : null;
  const skipToMonth = skipEnabled
    ? skipUnit === "years"
      ? skipTo * 12
      : skipTo
    : null;

  const analysis = useMemo(() => {
    const yearlyData = fund.chartData;
    const monthlyNav = interpolateMonthlyNav(yearlyData);
    const totalMonths = tenure * 12;
    const windows = [];

    // Each window: starting from year index `s`, covering `tenure` years
    for (let s = 0; s <= yearlyData.length - 1 - tenure; s++) {
      const startMonth = s * 12; // month index in monthlyNav
      const endMonth = startMonth + totalMonths;

      if (endMonth >= monthlyNav.length) break;

      if (mode === "lumpsum") {
        const startNav = monthlyNav[startMonth];
        const endNav = monthlyNav[endMonth];
        const totalReturn = ((endNav - startNav) / startNav) * 100;
        const cagr = (Math.pow(endNav / startNav, 1 / tenure) - 1) * 100;
        // Monthly snapshots for lump sum
        const monthlySnapshots: {
          month: number;
          invested: number;
          value: number;
          gain: number;
        }[] = [];
        const unitsHeld = amount / startNav;
        for (let m = 0; m <= totalMonths; m++) {
          const mi = startMonth + m;
          const val = unitsHeld * monthlyNav[mi];
          monthlySnapshots.push({
            month: m,
            invested: amount,
            value: val,
            gain: ((val - amount) / amount) * 100,
          });
        }
        windows.push({
          startYear: 2004 + s,
          endYear: 2004 + s + tenure,
          totalReturn,
          cagr,
          finalValue: (amount / startNav) * endNav,
          totalInvested: amount,
          monthlySnapshots,
        });
      } else {
        // SIP: month-by-month
        let totalInvested = 0;
        let units = 0;
        const monthlySnapshots: {
          month: number;
          invested: number;
          value: number;
          gain: number;
        }[] = [];

        for (let m = 0; m < totalMonths; m++) {
          const monthIndex = startMonth + m;
          const navAtMonth = monthlyNav[monthIndex];

          // Check stop
          if (stopAfterMonths !== null && m >= stopAfterMonths) {
            // Stopped contributing — just record snapshot
          } else if (
            skipFromMonth !== null &&
            skipToMonth !== null &&
            m >= skipFromMonth &&
            m < skipToMonth
          ) {
            // Skipping this month — no contribution
          } else {
            // Contribute this month
            totalInvested += amount;
            units += amount / navAtMonth;
          }

          const currentValue = units * navAtMonth;
          // Record every month
          monthlySnapshots.push({
            month: m + 1,
            invested: totalInvested,
            value: currentValue,
            gain:
              totalInvested > 0
                ? ((currentValue - totalInvested) / totalInvested) * 100
                : 0,
          });
        }

        const finalNav = monthlyNav[endMonth];
        const finalValue = units * finalNav;
        const totalReturn =
          totalInvested > 0
            ? ((finalValue - totalInvested) / totalInvested) * 100
            : 0;
        const cagr =
          totalInvested > 0
            ? (Math.pow(finalValue / totalInvested, 1 / tenure) - 1) * 100
            : 0;

        // Add final month snapshot
        monthlySnapshots.push({
          month: totalMonths,
          invested: totalInvested,
          value: finalValue,
          gain:
            totalInvested > 0
              ? ((finalValue - totalInvested) / totalInvested) * 100
              : 0,
        });

        windows.push({
          startYear: 2004 + s,
          endYear: 2004 + s + tenure,
          totalReturn,
          cagr,
          finalValue,
          totalInvested,
          monthlySnapshots,
        });
      }
    }

    if (windows.length === 0) return null;

    const best = windows.reduce((a, b) => (a.cagr > b.cagr ? a : b));
    const worst = windows.reduce((a, b) => (a.cagr < b.cagr ? a : b));
    const avgCagr = windows.reduce((s, w) => s + w.cagr, 0) / windows.length;
    const avgFinal =
      windows.reduce((s, w) => s + w.finalValue, 0) / windows.length;
    const lossWindows = windows.filter((w) => w.totalReturn < 0);
    const lossProbability = (lossWindows.length / windows.length) * 100;

    const bestSlice = fund.chartData.slice(
      best.startYear - 2004,
      best.endYear - 2004 + 1,
    );
    const worstSlice = fund.chartData.slice(
      worst.startYear - 2004,
      worst.endYear - 2004 + 1,
    );

    const normBest = bestSlice.map(
      (v) => (best.totalInvested / bestSlice[0]) * v,
    );
    const normWorst = worstSlice.map(
      (v) => (worst.totalInvested / worstSlice[0]) * v,
    );
    const chartLabels = Array.from({ length: tenure + 1 }, (_, i) => `Y${i}`);

    return {
      windows,
      best,
      worst,
      avgCagr,
      avgFinal,
      lossProbability,
      lossCount: lossWindows.length,
      totalWindows: windows.length,
      chartLabels,
      normalizedBest: normBest,
      normalizedWorst: normWorst,
    };
  }, [fund, tenure, amount, mode, stopAfterMonths, skipFromMonth, skipToMonth]);

  const scenarioChart = useMemo(() => {
    if (!analysis) return null;
    const investedAmount = analysis.best.totalInvested;
    return {
      labels: analysis.chartLabels,
      datasets: [
        {
          label: `Best (${analysis.best.startYear}–${analysis.best.endYear})`,
          data: analysis.normalizedBest,
          borderColor: "#10b981",
          backgroundColor: "#10b98120",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
        {
          label: `Worst (${analysis.worst.startYear}–${analysis.worst.endYear})`,
          data: analysis.normalizedWorst,
          borderColor: "#ef4444",
          backgroundColor: "#ef444420",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
        {
          label: "Invested",
          data: analysis.chartLabels.map(() => investedAmount),
          borderColor: "#94a3b8",
          borderWidth: 1,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
        },
      ],
    };
  }, [analysis]);

  const chartOpts = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index" as const, intersect: false },
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            color: "#94a3b8",
            font: { size: 11 },
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(15,23,42,0.9)",
          titleColor: "#e2e8f0",
          bodyColor: "#94a3b8",
          borderColor: "rgba(148,163,184,0.2)",
          borderWidth: 1,
          padding: 10,
          displayColors: true,
          callbacks: {
            label: (ctx: any) => {
              const n = ctx.parsed.y;
              const label = ctx.dataset.label || "";
              if (n >= 100000) return `${label}: ₹${(n / 100000).toFixed(1)}L`;
              if (n >= 1000) return `${label}: ₹${(n / 1000).toFixed(0)}k`;
              return `${label}: ₹${n}`;
            },
          },
        },
      },
      scales: {
        y: {
          grid: { color: "rgba(148,163,184,0.1)" },
          ticks: {
            color: "#94a3b8",
            callback: (v: number | string) => {
              const n = Number(v);
              return n >= 100000
                ? "₹" + (n / 100000).toFixed(1) + "L"
                : n >= 1000
                  ? "₹" + (n / 1000).toFixed(0) + "k"
                  : "₹" + n;
            },
          },
        },
        x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
      },
    }),
    [],
  );

  if (!analysis) return null;

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="border-b border-border pb-4">
        <h2
          className="text-3xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Return Calculator
        </h2>
        <p className="text-muted-foreground mt-1">
          Simulate historical returns with <Term t="SIP" /> or{" "}
          <Term t="Lump Sum">lump sum</Term> investments.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-1 p-1 rounded-lg bg-secondary/50 w-fit">
        {(["sip", "lumpsum"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${mode === m ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
          >
            {m === "sip" ? "SIP (Monthly)" : "Lump Sum"}
          </button>
        ))}
      </div>

      {/* Controls Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fund Selector */}
        <div className="space-y-2" ref={dropdownRef}>
          <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> Select Fund
          </label>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full text-left px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm font-medium flex justify-between items-center hover:border-primary/50 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>{fund.emoji}</span>
                <span>{fund.shortName}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden"
              >
                {fundIds.map((fid) => (
                  <button
                    key={fid}
                    onClick={() => {
                      setSelectedFundId(fid);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors cursor-pointer ${fid === selectedFundId ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-secondary"}`}
                  >
                    <span>{fundDB[fid].emoji}</span>
                    <span>{fundDB[fid].shortName}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {fundDB[fid].cagr20}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {mode === "sip" ? "Monthly SIP Amount" : "Investment Amount"}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">
              ₹
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(500, Number(e.target.value)))}
              min={500}
              step={mode === "sip" ? 500 : 10000}
              className="w-full pl-8 pr-4 py-3 rounded-lg border border-border bg-card text-foreground font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(mode === "sip"
              ? [1000, 5000, 10000, 25000, 50000]
              : [10000, 50000, 100000, 500000, 1000000]
            ).map((v) => (
              <button
                key={v}
                onClick={() => setAmount(v)}
                className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${amount === v ? "bg-primary/10 border-primary/30 text-primary font-bold" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {v >= 100000
                  ? v / 100000 + "L"
                  : v >= 1000
                    ? v / 1000 + "k"
                    : v}
              </button>
            ))}
          </div>
        </div>

        {/* Tenure */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Tenure: {tenure} Year
            {tenure > 1 ? "s" : ""}
          </label>
          <input
            type="range"
            min={1}
            max={20}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>1Y</span>
            <span>5Y</span>
            <span>10Y</span>
            <span>15Y</span>
            <span>20Y</span>
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="rounded-xl border border-border bg-card/50 p-5 space-y-5">
        {/* SIP-only options */}
        {mode === "sip" && (
          <>
            {/* Stop SIP After */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <ToggleSwitch
                  enabled={stopEnabled}
                  onChange={setStopEnabled}
                  label="Stop SIP After"
                />
              </div>
              <AnimatePresence>
                {stopEnabled && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        Stop after
                      </span>
                      <input
                        type="number"
                        value={stopValue}
                        min={1}
                        max={stopUnit === "years" ? tenure : tenure * 12}
                        onChange={(e) =>
                          setStopValue(Math.max(1, Number(e.target.value)))
                        }
                        className="w-20 px-3 py-2 rounded-lg border border-border bg-card text-foreground font-mono text-sm text-center focus:outline-none focus:border-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <div className="flex gap-0.5 p-0.5 rounded-md bg-secondary/50">
                        {(["years", "months"] as const).map((u) => (
                          <button
                            key={u}
                            onClick={() => {
                              if (u === stopUnit) return;
                              if (u === "months")
                                setStopValue(
                                  Math.min(stopValue * 12, tenure * 12),
                                );
                              else
                                setStopValue(
                                  Math.max(1, Math.round(stopValue / 12)),
                                );
                              setStopUnit(u);
                            }}
                            className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${stopUnit === u ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        — then let it grow
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Skip Payments */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <ToggleSwitch
                  enabled={skipEnabled}
                  onChange={setSkipEnabled}
                  label="Skip Payments"
                />
              </div>
              <AnimatePresence>
                {skipEnabled && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        Skip from
                      </span>
                      <input
                        type="number"
                        value={skipFrom}
                        min={1}
                        max={skipUnit === "years" ? tenure : tenure * 12}
                        onChange={(e) => {
                          const v = Math.max(1, Number(e.target.value));
                          setSkipFrom(v);
                          if (v > skipTo) setSkipTo(v);
                        }}
                        className="w-16 px-2 py-2 rounded-lg border border-border bg-card text-foreground font-mono text-sm text-center focus:outline-none focus:border-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-xs text-muted-foreground">to</span>
                      <input
                        type="number"
                        value={skipTo}
                        min={skipFrom}
                        max={skipUnit === "years" ? tenure : tenure * 12}
                        onChange={(e) =>
                          setSkipTo(Math.max(skipFrom, Number(e.target.value)))
                        }
                        className="w-16 px-2 py-2 rounded-lg border border-border bg-card text-foreground font-mono text-sm text-center focus:outline-none focus:border-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <div className="flex gap-0.5 p-0.5 rounded-md bg-secondary/50">
                        {(["years", "months"] as const).map((u) => (
                          <button
                            key={u}
                            onClick={() => setSkipUnit(u)}
                            className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${skipUnit === u ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />
          </>
        )}

        {/* Inflation Adjustment — available for both SIP and Lump Sum */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <ToggleSwitch
              enabled={inflationEnabled}
              onChange={setInflationEnabled}
              label="Adjust for Inflation"
            />
          </div>
          <AnimatePresence>
            {inflationEnabled && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-muted-foreground">
                      Avg. Inflation Rate
                    </span>
                    <span className="text-sm font-mono font-bold text-amber-400">
                      {inflationRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    step={0.5}
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex gap-2 flex-wrap">
                    {[4, 5, 6, 7, 8].map((r) => (
                      <button
                        key={r}
                        onClick={() => setInflationRate(r)}
                        className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${inflationRate === r ? "bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold" : "border-border text-muted-foreground hover:text-foreground"}`}
                      >
                        {r}%
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Shows what your returns would be worth in today&apos;s
                    purchasing power. India&apos;s historical avg CPI inflation
                    is ~5-6%.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Wallet className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-bold uppercase text-violet-400">
              Total Invested
            </span>
          </div>
          <p className="text-2xl font-mono font-bold text-violet-400">
            {formatCurrency(analysis.best.totalInvested)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {mode === "sip"
              ? `${formatCurrency(amount)}/mo × ${tenure}Y`
              : "One-time"}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase text-emerald-400">
              Best Case
            </span>
          </div>
          <p className="text-2xl font-mono font-bold text-emerald-400">
            {formatCurrency(analysis.best.finalValue)}
          </p>
          {inflationEnabled && (
            <p className="text-xs font-mono text-amber-400 mt-0.5">
              Real:{" "}
              {formatCurrency(
                deflate(analysis.best.finalValue, tenure, inflationRate),
              )}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            <Term t="CAGR" />: {analysis.best.cagr.toFixed(1)}%
            {inflationEnabled &&
              ` (Real: ${(analysis.best.cagr - inflationRate).toFixed(1)}%)`}{" "}
            ({analysis.best.startYear}–{analysis.best.endYear})
          </p>
        </div>
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Percent className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase text-blue-400">
              Average
            </span>
          </div>
          <p className="text-2xl font-mono font-bold text-blue-400">
            {formatCurrency(analysis.avgFinal)}
          </p>
          {inflationEnabled && (
            <p className="text-xs font-mono text-amber-400 mt-0.5">
              Real:{" "}
              {formatCurrency(
                deflate(analysis.avgFinal, tenure, inflationRate),
              )}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Avg <Term t="CAGR" />: {analysis.avgCagr.toFixed(1)}%
            {inflationEnabled &&
              ` (Real: ${(analysis.avgCagr - inflationRate).toFixed(1)}%)`}{" "}
            across {analysis.totalWindows} windows
          </p>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-xs font-bold uppercase text-red-400">
              Worst Case
            </span>
          </div>
          <p className="text-2xl font-mono font-bold text-red-400">
            {formatCurrency(analysis.worst.finalValue)}
          </p>
          {inflationEnabled && (
            <p className="text-xs font-mono text-amber-400 mt-0.5">
              Real:{" "}
              {formatCurrency(
                deflate(analysis.worst.finalValue, tenure, inflationRate),
              )}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            <Term t="CAGR" />: {analysis.worst.cagr.toFixed(1)}%
            {inflationEnabled &&
              ` (Real: ${(analysis.worst.cagr - inflationRate).toFixed(1)}%)`}{" "}
            ({analysis.worst.startYear}–{analysis.worst.endYear})
          </p>
        </div>
        <div
          className={`rounded-xl border p-4 ${analysis.lossProbability > 0 ? "border-amber-500/20 bg-amber-500/5" : "border-emerald-500/20 bg-emerald-500/5"}`}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle
              className={`w-4 h-4 ${analysis.lossProbability > 0 ? "text-amber-400" : "text-emerald-400"}`}
            />
            <span
              className={`text-xs font-bold uppercase ${analysis.lossProbability > 0 ? "text-amber-400" : "text-emerald-400"}`}
            >
              Loss Risk
            </span>
          </div>
          <p
            className={`text-2xl font-mono font-bold ${analysis.lossProbability > 0 ? "text-amber-400" : "text-emerald-400"}`}
          >
            {analysis.lossProbability.toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {analysis.lossCount} of {analysis.totalWindows} windows had negative
            returns
          </p>
          {inflationEnabled && (
            <p className="text-xs text-amber-400/70 mt-1">
              {
                analysis.windows.filter((w) => w.cagr - inflationRate < 0)
                  .length
              }{" "}
              of {analysis.totalWindows} negative after inflation
            </p>
          )}
        </div>
      </div>

      {/* Chart */}
      {scenarioChart && (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">
              Best vs Worst — {tenure}Y
              {inflationEnabled && " (with inflation-adjusted line)"}
            </h3>
            <span className="text-xs text-muted-foreground">
              Invested: {formatCurrency(analysis.best.totalInvested)}
            </span>
          </div>
          <div className="h-[300px]">
            <Line
              data={{
                ...scenarioChart,
                datasets: [
                  ...scenarioChart.datasets,
                  ...(inflationEnabled
                    ? [
                        {
                          label: `Best (Real @ ${inflationRate}%)`,
                          data: analysis.normalizedBest.map((v, idx) =>
                            deflate(v, idx, inflationRate),
                          ),
                          borderColor: "#f59e0b",
                          backgroundColor: "#f59e0b15",
                          borderWidth: 2,
                          borderDash: [6, 3],
                          fill: false,
                          tension: 0.4,
                          pointRadius: 0,
                        },
                      ]
                    : []),
                ],
              }}
              options={chartOpts}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="font-bold text-foreground text-sm">
            All Historical {tenure}-Year Windows ({analysis.totalWindows}{" "}
            scenarios)
          </h3>
          <span className="text-[10px] text-muted-foreground">
            Click a row to expand period breakdown
          </span>
        </div>
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase bg-secondary/50 border-b border-border sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-foreground w-8"></th>
                <th className="px-4 py-3 text-left text-foreground">Period</th>
                <th className="px-4 py-3 text-right text-foreground">
                  <Term t="CAGR" />
                </th>
                <th className="px-4 py-3 text-right text-foreground">
                  Total Return
                </th>
                <th className="px-4 py-3 text-right text-foreground">
                  Invested
                </th>
                <th className="px-4 py-3 text-right text-foreground">
                  Final Value
                </th>
              </tr>
            </thead>
            <tbody>
              {analysis.windows
                .sort((a, b) => b.cagr - a.cagr)
                .map((w, i) => {
                  const isExpanded = expandedWindow === i;
                  return (
                    <Fragment key={`window-${i}`}>
                      <tr
                        onClick={() => setExpandedWindow(isExpanded ? null : i)}
                        className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-2 text-muted-foreground">
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground font-mono text-xs">
                          {w.startYear}–{w.endYear}
                        </td>
                        <td
                          className={`px-4 py-2 text-right font-mono font-bold ${w.cagr >= 0 ? "text-emerald-400" : "text-red-400"}`}
                        >
                          {w.cagr.toFixed(1)}%
                          {inflationEnabled && (
                            <span className="block text-[10px] text-amber-400 font-normal">
                              Real: {(w.cagr - inflationRate).toFixed(1)}%
                            </span>
                          )}
                        </td>
                        <td
                          className={`px-4 py-2 text-right font-mono ${w.totalReturn >= 0 ? "text-emerald-400" : "text-red-400"}`}
                        >
                          {w.totalReturn >= 0 ? "+" : ""}
                          {w.totalReturn.toFixed(0)}%
                        </td>
                        <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                          {formatCurrency(w.totalInvested)}
                        </td>
                        <td className="px-4 py-2 text-right font-mono text-foreground">
                          {formatCurrency(w.finalValue)}
                          {inflationEnabled && (
                            <span className="block text-[10px] text-amber-400">
                              Real:{" "}
                              {formatCurrency(
                                deflate(w.finalValue, tenure, inflationRate),
                              )}
                            </span>
                          )}
                        </td>
                      </tr>
                      {isExpanded && w.monthlySnapshots && (
                        <tr key={`detail-${i}`}>
                          <td colSpan={6} className="p-0">
                            <div className="bg-secondary/20 border-y border-border/30">
                              <div className="px-6 py-3 border-b border-border/20 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase text-muted-foreground">
                                  {breakdownView === "monthly"
                                    ? "Monthly"
                                    : "Yearly"}{" "}
                                  Breakdown — {w.startYear}–{w.endYear}
                                </span>
                                <div className="flex gap-0.5 p-0.5 rounded-md bg-secondary/50">
                                  {(["monthly", "yearly"] as const).map((v) => (
                                    <button
                                      key={v}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setBreakdownView(v);
                                      }}
                                      className={`px-2.5 py-1 rounded text-[10px] font-medium transition-all cursor-pointer ${breakdownView === v ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                                    >
                                      {v}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="max-h-[250px] overflow-y-auto">
                                <table className="w-full text-xs">
                                  <thead className="sticky top-0 bg-secondary/40">
                                    <tr>
                                      <th className="px-6 py-2 text-left text-muted-foreground">
                                        Month
                                      </th>
                                      <th className="px-4 py-2 text-right text-muted-foreground">
                                        Invested
                                      </th>
                                      <th className="px-4 py-2 text-right text-muted-foreground">
                                        Value
                                      </th>
                                      <th className="px-4 py-2 text-right text-muted-foreground">
                                        Gain/Loss
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {w.monthlySnapshots
                                      .filter(
                                        (snap) =>
                                          breakdownView === "monthly" ||
                                          snap.month % 12 === 0,
                                      )
                                      .map((snap, si) => (
                                        <tr
                                          key={si}
                                          className="border-b border-border/10 hover:bg-secondary/20"
                                        >
                                          <td className="px-6 py-1.5 font-mono text-muted-foreground">
                                            {breakdownView === "yearly" ? (
                                              <>Y{snap.month / 12}</>
                                            ) : (
                                              <>
                                                M{snap.month}
                                                {snap.month % 12 === 0 && (
                                                  <span className="ml-1.5 text-[9px] text-primary/60">
                                                    Y{snap.month / 12}
                                                  </span>
                                                )}
                                              </>
                                            )}
                                          </td>
                                          <td className="px-4 py-1.5 text-right font-mono text-muted-foreground">
                                            {formatCurrency(snap.invested)}
                                          </td>
                                          <td className="px-4 py-1.5 text-right font-mono text-foreground">
                                            {formatCurrency(snap.value)}
                                            {inflationEnabled && (
                                              <span className="block text-[9px] text-amber-400">
                                                Real:{" "}
                                                {formatCurrency(
                                                  deflate(
                                                    snap.value,
                                                    snap.month / 12,
                                                    inflationRate,
                                                  ),
                                                )}
                                              </span>
                                            )}
                                          </td>
                                          <td
                                            className={`px-4 py-1.5 text-right font-mono font-medium ${snap.gain >= 0 ? "text-emerald-400" : "text-red-400"}`}
                                          >
                                            {snap.gain >= 0 ? "+" : ""}
                                            {snap.gain.toFixed(1)}%
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
