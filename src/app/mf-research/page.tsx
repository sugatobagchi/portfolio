"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Home, Calculator } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { fundDB, fundIds, years } from "./_components/fundData";
import { CalculatorView } from "./_components/Calculator";
import { Term } from "./_components/Term";
import type { FundData } from "./_components/fundData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

type ViewId = "overview" | "calculator" | string;

// --- ANIMATED THEME TOGGLE ---

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted)
    return <div className="w-14 h-7 rounded-full bg-secondary/50" />;

  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 cursor-pointer ${isDark ? "bg-slate-700" : "bg-sky-200"}`}
      aria-label="Toggle theme"
    >
      <AnimatePresence>
        {isDark && (
          <>
            {[
              { x: 22, y: 8, s: 1.5 },
              { x: 28, y: 16, s: 1 },
              { x: 18, y: 18, s: 2 },
              { x: 34, y: 10, s: 1.2 },
            ].map((star, i) => (
              <motion.div
                key={`star-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: i * 0.08, duration: 0.25 }}
                className="absolute rounded-full bg-white"
                style={{
                  width: star.s,
                  height: star.s,
                  left: star.x,
                  top: star.y,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      <motion.div
        layout
        className={`absolute top-[3px] w-[22px] h-[22px] rounded-full shadow-md flex items-center justify-center ${isDark ? "bg-slate-900" : "bg-yellow-400"}`}
        animate={{ left: isDark ? 3 : 31 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-3 h-3 text-yellow-300" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-3 h-3 text-yellow-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}

// --- NAV TABS ---

const navTabs = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "calculator", label: "Calculator", icon: Calculator },
];

function NavBar({
  currentView,
  onNavigate,
}: {
  currentView: ViewId;
  onNavigate: (v: ViewId) => void;
}) {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-3">
          <div>
            <h1
              className="text-xl font-bold text-foreground tracking-tighter"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              LEGACY <span className="text-primary">ALPHA</span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-mono">
              EST. 2000 • INDIA RESEARCH
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 pb-2 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            );
          })}

          <div className="w-px h-5 bg-border mx-1 shrink-0" />

          {fundIds.map((fid) => {
            const f = fundDB[fid];
            const isActive = currentView === fid;
            return (
              <button
                key={fid}
                onClick={() => onNavigate(fid)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${isActive ? "border-primary/30 bg-primary/10 text-primary shadow-sm" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
              >
                <span>{f.emoji}</span>
                <span className="hidden sm:inline">{f.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

// --- CHARTS ---

function FundProfileChart({ fund }: { fund: FundData }) {
  const data = useMemo(
    () => ({
      labels: years,
      datasets: [
        {
          label: fund.name,
          data: fund.chartData,
          borderColor: fund.color,
          backgroundColor: fund.color + "20",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        },
      ],
    }),
    [fund],
  );
  const opts = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index" as const, intersect: false },
      plugins: {
        legend: { display: false },
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
            label: (ctx: any) =>
              `${ctx.dataset.label || ""}: ₹${ctx.parsed.y}k`,
          },
        },
      },
      scales: {
        y: {
          grid: { color: "rgba(148,163,184,0.1)" },
          ticks: {
            color: "#94a3b8",
            callback: (v: number | string) => "₹" + v + "k",
          },
        },
        x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
      },
    }),
    [],
  );
  return (
    <div className="relative w-full h-[350px]">
      <Line data={data} options={opts} />
    </div>
  );
}

function ComparisonChart() {
  const data = useMemo(
    () => ({
      labels: years,
      datasets: Object.values(fundDB).map((f) => ({
        label: f.name,
        data: f.chartData,
        borderColor: f.color,
        backgroundColor: f.color,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0,
        fill: false,
      })),
    }),
    [],
  );
  const opts = useMemo(
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
            label: (ctx: any) =>
              `${ctx.dataset.label || ""}: ₹${ctx.parsed.y}k`,
          },
        },
      },
      scales: {
        y: {
          grid: { color: "rgba(148,163,184,0.1)" },
          ticks: { color: "#94a3b8" },
        },
        x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
      },
    }),
    [],
  );
  return (
    <div className="relative w-full h-[400px]">
      <Line data={data} options={opts} />
    </div>
  );
}

// --- WIKI DATA ---

const wikiTerms = [
  {
    term: "Mutual Fund",
    emoji: "📦",
    tldr: "A pool of money from many investors, managed by a professional.",
    detail:
      "Think of it like a potluck dinner: everyone brings some money, a professional chef (fund manager) decides what dishes to buy (stocks/bonds), and all the gains or losses are shared proportionally. You don't need to pick individual stocks — the manager does it for you.",
  },
  {
    term: "NAV (Net Asset Value)",
    emoji: "🏷️",
    tldr: "The price of one unit of the fund — like the MRP of a share.",
    detail:
      "Every mutual fund is divided into 'units'. NAV tells you what one unit is worth today. If a fund's NAV is ₹150, and you invest ₹15,000, you get 100 units. When NAV rises to ₹180, your 100 units are now worth ₹18,000. Simple!",
  },
  {
    term: "SIP (Systematic Investment Plan)",
    emoji: "🔄",
    tldr: "Auto-invest a fixed amount every month — like a subscription for wealth.",
    detail:
      "Instead of investing a big chunk at once, SIP lets you invest ₹500, ₹5,000, or any amount monthly. The magic? When markets fall, your fixed amount buys MORE units (cheaper). When markets rise, your units become valuable. Over time, this averages out the cost — it's called 'Rupee Cost Averaging'. You don't need to time the market.",
  },
  {
    term: "Lump Sum",
    emoji: "💰",
    tldr: "Investing all your money at once.",
    detail:
      "Unlike SIP, you put in a big amount in one go. This works great if markets are low (you buy cheap), but risky if markets are at a peak (you buy expensive). A lump sum of ₹10 lakh in 2008 crash would have become ₹50+ lakh by 2024!",
  },
  {
    term: "CAGR",
    emoji: "📈",
    tldr: "Your true annualized return — what the fund actually earned per year.",
    detail:
      "If ₹1 lakh became ₹6 lakh in 15 years, the CAGR is ~12.7%. It's the smoothed-out annual return, ignoring the ups and downs. CAGR is the fairest way to compare different investments over different time periods. Don't be fooled by 'total return' — always ask for CAGR.",
  },
  {
    term: "Compounding",
    emoji: "🌱",
    tldr: "Earning returns on your returns — the 8th wonder of the world.",
    detail:
      "Year 1: You invest ₹1 lakh, earn 12% → ₹1.12 lakh. Year 2: You earn 12% on ₹1.12 lakh (not ₹1 lakh) → ₹1.25 lakh. The snowball grows faster every year. At 15% annual return:\n• 10 years: ₹1L → ₹4L\n• 20 years: ₹1L → ₹16L\n• 30 years: ₹1L → ₹66L\nTime is the magic ingredient. Start early.",
  },
  {
    term: "AUM",
    emoji: "🏦",
    tldr: "Total money the fund manages — a trust indicator.",
    detail:
      "A fund with ₹50,000 Cr AUM means investors collectively trust it with ₹50,000 crore. Higher AUM generally means more investor confidence. However, extremely high AUM in a mid-cap fund can be a problem — it becomes hard to buy/sell smaller stocks without moving prices.",
  },
  {
    term: "Expense Ratio",
    emoji: "🧾",
    tldr: "The annual fee the fund charges — deducted automatically from returns.",
    detail:
      "If a fund's expense ratio is 1%, and it earns 15% gross returns, you get ~14% net returns. The fee covers the manager's salary, operations, marketing. Lower is better — a 0.5% difference compounded over 20 years can mean lakhs in savings. Index funds charge 0.1-0.3%, active funds charge 0.8-1.5%.",
  },
  {
    term: "Alpha",
    emoji: "⭐",
    tldr: "How much EXTRA return the fund generates over the market benchmark.",
    detail:
      "If Nifty (benchmark) returns 12% and the fund returns 15%, the alpha is +3%. Positive alpha = the manager is adding value. Negative alpha = you're better off with a simple index fund. Consistent alpha over 10+ years is very rare and valuable — it's what separates great funds from average ones.",
  },
  {
    term: "Beta",
    emoji: "⚖️",
    tldr: "How much the fund moves compared to the market.",
    detail:
      "Beta = 1 → moves exactly with market. Beta = 1.2 → 20% more volatile (market falls 10%, fund falls 12%). Beta = 0.8 → 20% less volatile (safer). High-beta funds are exciting in bull markets but painful in crashes. Think of beta as the fund's 'sensitivity dial'. Conservative investors prefer beta < 1.",
  },
  {
    term: "Risk Profile",
    emoji: "🎯",
    tldr: "How bumpy the ride will be — from smooth highway to mountain road.",
    detail:
      "• Low Risk: Like a fixed deposit with slightly better returns. Barely any drops.\n• Moderate: Some ups and downs, but recovers within months.\n• High: Can drop 30-40% in crashes but historically delivers the highest long-term returns.\n• Very High: Roller-coaster. Can drop 50%+ but also deliver 20%+ CAGR over 20 years.\nMatch your risk tolerance to your timeline. 20+ year horizon? You can handle high risk.",
  },
  {
    term: "Drawdown",
    emoji: "📉",
    tldr: "The fall from the peak — how much you'd temporarily lose in a crash.",
    detail:
      "If a fund's NAV went from ₹100 → ₹60, the drawdown is -40%. Every fund experiences drawdowns. What matters is: (1) How deep was the fall? (2) How fast did it recover? A fund that fell 40% in 2008 but recovered by 2010 is very different from one that took 5 years to recover.",
  },
  {
    term: "Diversification",
    emoji: "🥗",
    tldr: "Don't put all eggs in one basket — spread across different assets.",
    detail:
      "If you invest only in one stock and it crashes, you lose everything. But if you invest in 50 stocks across different sectors, a crash in one barely hurts. That's diversification. Mutual funds do this automatically — a single fund typically holds 40-60 stocks across banking, IT, pharma, consumer goods, etc.",
  },
  {
    term: "Benchmark Index",
    emoji: "📊",
    tldr: "The yardstick to measure if your fund is doing well or poorly.",
    detail:
      "Nifty 50 (top 50 Indian stocks) is the most common benchmark. If Nifty returned 12% and your fund returned 10%, your fund underperformed. If your fund returned 15%, it outperformed. Always compare your fund's returns against its benchmark — absolute returns alone don't tell the full story.",
  },
  {
    term: "Lock-in & Exit Load",
    emoji: "🔒",
    tldr: "Time restrictions and charges for withdrawing your money.",
    detail:
      "• ELSS funds have a 3-year lock-in (tax saving).\n• Most equity funds charge 1% exit load if withdrawn within 1 year.\n• After 1 year, withdrawals are usually free.\nPlan accordingly — equity investments work best with 5+ year horizons. Short-term = high risk + penalties.",
  },
  {
    term: "Rupee Cost Averaging",
    emoji: "⚡",
    tldr: "SIP's secret weapon — automatically buy more when prices drop.",
    detail:
      "Month 1: NAV ₹100, SIP ₹5000 → 50 units. Month 2: NAV ₹80 (crash!), SIP ₹5000 → 62.5 units. Month 3: NAV ₹120, SIP ₹5000 → 41.7 units. Total: ₹15,000 invested → 154.2 units. Average cost: ~₹97/unit. Your average buying price is lower than the average NAV! This is the power of SIP — crashes become opportunities.",
  },
];

// --- WIKI SECTION (inline, for use in overview/fund pages) ---

function WikiSection() {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div>
        <h3
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          📚 Investment Dictionary
        </h3>
        <p className="text-muted-foreground text-sm mt-1">
          Tap any term to learn what it means — explained simply.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {wikiTerms.map((item) => {
          const isOpen = expandedTerm === item.term;
          return (
            <motion.div
              key={item.term}
              layout
              className={`rounded-xl border bg-card overflow-hidden cursor-pointer transition-colors ${isOpen ? "border-primary/30 col-span-1 md:col-span-2" : "border-border hover:border-primary/20"}`}
              onClick={() => setExpandedTerm(isOpen ? null : item.term)}
            >
              <div className="p-3 flex items-start gap-3">
                <span className="text-xl shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-foreground text-sm">
                      {item.term}
                    </h4>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="text-muted-foreground text-xs shrink-0"
                    >
                      ▼
                    </motion.span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.tldr}
                  </p>
                </div>
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 pt-0 ml-9">
                      <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// --- OVERVIEW (merged Market Thesis + Analytics + Wiki) ---

function OverviewView({ onNavigate }: { onNavigate: (v: ViewId) => void }) {
  return (
    <div className="space-y-10 animate-[fadeIn_0.3s_ease-in-out]">
      {/* Hero Thesis */}
      <div className="border-b border-border pb-6">
        <h2
          className="text-3xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Investment Thesis: The 20-Year Filter
        </h2>
        <p className="text-muted-foreground mt-2 text-lg max-w-4xl">
          Identifying &ldquo;Legacy Wealth Builders&rdquo; requires looking
          beyond the last bull run. Only funds that have navigated the{" "}
          <span className="font-bold text-red-400">2000 Dot-com bust</span>, the{" "}
          <span className="font-bold text-red-400">2008 GFC</span>, and the{" "}
          <span className="font-bold text-red-400">2020 Pandemic</span> prove
          the resilience required for generational wealth creation.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Universe Filtered",
            value: "5",
            sub: "/ 400+ Schemes",
            desc: "Only 5 funds met the strict criteria of >20yr track record + consistent benchmark alpha.",
            borderColor: "border-l-primary",
            valueColor: "text-foreground",
          },
          {
            title: "Avg 20Y Alpha",
            titleTerm: "Alpha",
            value: "+2.8%",
            sub: "CAGR over Nifty",
            subTerms: ["CAGR", "Nifty"] as string[],
            desc: "Consistent outperformance generated purely through stock selection, not luck.",
            borderColor: "border-l-emerald-500",
            valueColor: "text-emerald-400",
          },
          {
            title: "Resilience Score",
            titleTerm: "Resilience Score",
            value: "High",
            sub: "Recovery Rate",
            desc: "All selected funds recovered to pre-crash highs within 18-24 months of major crashes.",
            borderColor: "border-l-violet-500",
            valueColor: "text-violet-400",
          },
        ].map((m) => (
          <div
            key={m.title}
            className={`rounded-xl border border-border bg-card p-6 border-l-4 ${m.borderColor}`}
          >
            <h3 className="text-sm uppercase font-bold text-muted-foreground mb-2">
              {"titleTerm" in m && m.titleTerm ? (
                <Term t={m.titleTerm as string}>{m.title}</Term>
              ) : (
                m.title
              )}
            </h3>
            <div className="flex items-baseline">
              <span className={`text-4xl font-mono font-bold ${m.valueColor}`}>
                {m.value}
              </span>
              <span className="text-sm text-muted-foreground ml-2">
                {m.sub}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Why these categories + Methodology */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3
            className="text-xl font-bold text-foreground mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Why these categories?
          </h3>
          <ul className="space-y-4">
            {[
              {
                emoji: "🛡️",
                title: (
                  <>
                    <Term t="Large Cap" /> &amp; <Term t="Flexi Cap" />
                  </>
                ),
                key: "largeflexi",
                desc: "The core engine. Funds like HDFC Top 100 provide stability, while Flexi Caps allow managers to navigate sectors freely.",
              },
              {
                emoji: "🚀",
                title: (
                  <>
                    <Term t="Mid Cap" /> <Term t="Alpha" />
                  </>
                ),
                key: "midcap",
                desc: "Where the real wealth is made. Nippon Growth and Franklin Prima have turned small investments into fortunes over decades.",
              },
              {
                emoji: "🌍",
                title: (
                  <>
                    International Proxy (<Term t="MNC Fund">MNC</Term>)
                  </>
                ),
                key: "mnc",
                desc: "True international funds lack 20-year history in India. ABSL MNC invests in global parentage companies for currency/governance diversification.",
              },
            ].map((item) => (
              <li key={item.key} className="flex items-start">
                <span className="text-xl mr-3">{item.emoji}</span>
                <div>
                  <h4 className="font-bold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h3
            className="text-lg font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Research Methodology
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Over 20 years of <Term t="NAV" /> data has been analyzed to filter
            this specific selection from 400+ mutual fund schemes. The criteria
            includes consistent <Term t="Alpha">alpha</Term> generation over{" "}
            <Term t="Benchmark">benchmark</Term>, crisis recovery speed, style
            discipline through market cycles, and portfolio transparency. Use
            the Return Calculator to simulate historical outcomes for any fund
            over custom tenures.
          </p>
        </div>
      </div>

      {/* Comparative Analytics */}
      <div className="space-y-6">
        <h3
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Comparative Analytics
        </h3>
        <div
          className="rounded-xl border border-border bg-card p-6"
          style={{ minHeight: "400px" }}
        >
          <ComparisonChart />
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-muted-foreground">
              <thead className="text-xs uppercase bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-foreground">Fund</th>
                  <th className="px-6 py-4 text-foreground">
                    20Y <Term t="CAGR" />
                  </th>
                  <th className="px-6 py-4 text-foreground">
                    <Term t="Beta" />
                  </th>
                  <th className="px-6 py-4 text-foreground">
                    <Term t="Expense Ratio">Expense</Term>
                  </th>
                  <th className="px-6 py-4 text-foreground">
                    <Term t="Risk Profile">Risk</Term>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.values(fundDB).map((f) => (
                  <tr
                    key={f.id}
                    onClick={() => onNavigate(f.id)}
                    className="border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer"
                  >
                    <td
                      className="px-6 py-4 font-bold"
                      style={{ color: f.color }}
                    >
                      <span className="mr-2">{f.emoji}</span>
                      <span className="hover:underline">{f.name}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-foreground font-bold">
                      {f.cagr20}
                    </td>
                    <td className="px-6 py-4 font-mono">{f.beta}</td>
                    <td className="px-6 py-4 font-mono">{f.expense}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded border ${f.risk.includes("High") ? "bg-red-500/10 text-red-400 border-red-500/20" : f.risk.includes("Low") ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                      >
                        {f.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Wiki — inline at bottom of overview */}
      <div className="border-t border-border pt-8">
        <WikiSection />
      </div>
    </div>
  );
}

// --- FUND PROFILE VIEW ---

function FundProfileView({ fund }: { fund: FundData }) {
  const riskBadge = (risk: string) =>
    risk.includes("High") || risk.includes("Very")
      ? "bg-red-500/10 text-red-400 border-red-500/20"
      : risk.includes("Low")
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : "bg-blue-500/10 text-blue-400 border-blue-500/20";

  return (
    <div className="flex flex-col space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{fund.emoji}</span>
            <h2
              className="text-3xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {fund.name}
            </h2>
            <span className="px-2 py-1 text-xs rounded font-bold bg-secondary text-secondary-foreground">
              {fund.category}
            </span>
          </div>
          <p className="text-lg text-muted-foreground font-medium">
            {fund.tagline}
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-3xl font-mono font-bold text-emerald-400">
            {fund.cagr20}
          </p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            20-Year <Term t="CAGR" />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-bold uppercase text-muted-foreground mb-4">
              Fund Fundamentals
            </h3>
            <div className="space-y-3">
              {[
                { l: "Launch Date", v: fund.launch },
                { l: "AUM", v: fund.aum, term: "AUM" as const },
                {
                  l: "Expense Ratio",
                  v: fund.expense,
                  term: "Expense Ratio" as const,
                },
              ].map((i) => (
                <div key={i.l} className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {"term" in i && i.term ? (
                      <Term t={i.term}>{i.l}</Term>
                    ) : (
                      i.l
                    )}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {i.v}
                  </span>
                </div>
              ))}
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  <Term t="Alpha">Alpha (vs BM)</Term>
                </span>
                <span className="text-sm font-bold text-emerald-400">
                  {fund.alpha}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  <Term t="Beta" />
                </span>
                <span className="text-sm font-bold text-foreground">
                  {fund.beta}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  <Term t="Risk Profile" />
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded border ${riskBadge(fund.risk)}`}
                >
                  {fund.risk}
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 border-l-4 border-l-primary">
            <h3 className="text-xs font-bold uppercase text-primary mb-2">
              Why It&apos;s Trusted
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {fund.whyTrusted}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-bold uppercase text-muted-foreground mb-2">
              Management Legacy
            </h3>
            <p className="text-sm font-bold text-foreground mb-1">
              {fund.manager}
            </p>
            <p className="text-xs text-muted-foreground">{fund.desc}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3">
              Top Holdings
            </h3>
            <div className="flex flex-wrap gap-2">
              {fund.holdings.map((h) => (
                <span
                  key={h}
                  className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-foreground">
                Growth of ₹10,000 (Simulated)
              </h3>
              <span className="text-xs text-muted-foreground">2004 – 2024</span>
            </div>
            <FundProfileChart fund={fund} />
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-bold text-foreground mb-4">
              Crisis Resilience Matrix
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { l: "2000 Dot-com", v: fund.resilience.t2000 },
                { l: "2008 GFC", v: fund.resilience.t2008 },
                { l: "2020 Covid", v: fund.resilience.t2020 },
              ].map((c) => (
                <div
                  key={c.l}
                  className="text-center p-3 bg-red-500/5 rounded-lg border border-red-500/10"
                >
                  <p className="text-xs text-muted-foreground mb-1">{c.l}</p>
                  <p className="text-lg font-bold text-red-400">{c.v}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Peak-to-trough drawdown during the crisis period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---

export default function MFResearchPage() {
  const [currentView, setCurrentView] = useState<ViewId>("overview");

  const handleNav = useCallback((viewId: ViewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderView = () => {
    if (currentView === "overview")
      return <OverviewView onNavigate={handleNav} />;
    if (currentView === "calculator") return <CalculatorView />;
    const fund = fundDB[currentView];
    if (fund) return <FundProfileView fund={fund} />;
    return <OverviewView onNavigate={handleNav} />;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar currentView={currentView} onNavigate={handleNav} />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {renderView()}
      </main>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
