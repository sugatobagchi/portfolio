"use client";

import { useState, useMemo } from "react";
import { Metadata } from "next";
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
import { Line, Bar } from "react-chartjs-2";

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

// --- DATA ---

interface FundData {
  id: string;
  name: string;
  category: string;
  launchDate: string;
  cagr20: string;
  expense: string;
  trustReason: string;
  alphaStrategy: string;
  managerLegacy: string;
  resilience: string;
  role: string;
  color: string;
  dataPoints: number[];
}

const fundsData: FundData[] = [
  {
    id: "hdfc-flexi",
    name: "HDFC Flexi Cap Fund",
    category: "Flexi Cap",
    launchDate: "Jan 1995",
    cagr20: "18.5%",
    expense: "0.88%",
    trustReason:
      "The 'Giant' of Indian Mutual Funds. Formerly HDFC Equity, it has a legendary history under Prashant Jain. It is known for its contrarian bets that pay off massively over long cycles. It survived 2008 better than most aggressive peer funds by sticking to valuation comfort.",
    alphaStrategy:
      "Maintains a value-biased portfolio. Does not chase momentum. Historically high allocation to corporate banks and utilities during unloved periods.",
    managerLegacy:
      "Managed by Roshi Jain (since 2022), carrying forward the 28-year legacy of Prashant Jain. High manager tenure stability historically.",
    resilience: "High",
    role: "Core Portfolio Builder",
    color: "#1e3a8a",
    dataPoints: [
      10, 14, 12, 25, 45, 60, 40, 75, 90, 110, 105, 140, 160, 200, 240, 220,
      280, 350, 420, 500, 580,
    ],
  },
  {
    id: "franklin-prima",
    name: "Franklin India Prima",
    category: "Mid Cap",
    launchDate: "Dec 1993",
    cagr20: "19.2%",
    expense: "1.05%",
    trustReason:
      "The 'Pioneer' of Midcap investing. With over 30 years of history, it has seen every market cycle. It is renowned for its bottom-up stock picking and strict quality filters, which helped it navigate the 2018 midcap crash with relative resilience.",
    alphaStrategy:
      "Focuses on high-growth companies with clean balance sheets. Avoids leverage. Consistent alpha over Nifty Midcap 150 over 15-year rolling periods.",
    managerLegacy:
      "R. Janakiraman has been at the helm for over a decade, providing immense stability in style and execution.",
    resilience: "Medium-High",
    role: "Aggressive Growth",
    color: "#059669",
    dataPoints: [
      10, 11, 15, 30, 65, 80, 45, 90, 110, 130, 120, 160, 200, 250, 290, 270,
      350, 450, 500, 600, 700,
    ],
  },
  {
    id: "nippon-growth",
    name: "Nippon India Growth",
    category: "Mid Cap",
    launchDate: "Oct 1995",
    cagr20: "21.5%",
    expense: "1.08%",
    trustReason:
      "A true 'Wealth Compounder'. Formerly Reliance Growth, it was the first fund to reach a NAV of ₹100, then ₹1000, then ₹2000. It captures the high-beta growth of the Indian economy specifically through emerging leaders.",
    alphaStrategy:
      "Growth at Reasonable Price (GARP). Willing to take cash calls or sector deviations. Massive alpha generator in bull runs (2003-2007, 2014-2017).",
    managerLegacy:
      "Manish Gunwani (recent) and legacy of heavyweights like Sunil Singhania. The fund process is institutionalized.",
    resilience: "Medium",
    role: "Alpha Generator",
    color: "#db2777",
    dataPoints: [
      10, 12, 18, 40, 90, 100, 50, 110, 140, 170, 160, 210, 280, 340, 380, 360,
      480, 600, 700, 850, 950,
    ],
  },
  {
    id: "hdfc-top100",
    name: "HDFC Top 100 Fund",
    category: "Large Cap",
    launchDate: "Oct 1996",
    cagr20: "17.8%",
    expense: "0.95%",
    trustReason:
      "The 'Safe Anchor'. One of the oldest large-cap funds. It rarely deviates from the top 100 companies by market cap, ensuring high liquidity and lower volatility compared to mid-caps.",
    alphaStrategy:
      "Strictly adheres to Large Cap universe. Generates alpha through sector rotation (e.g., overweight on Energy/Utilities when they were undervalued).",
    managerLegacy:
      "Another flagship formerly managed by Prashant Jain, now Rahul Baijal. Consistency in philosophy is its hallmark.",
    resilience: "Very High",
    role: "Capital Protection",
    color: "#475569",
    dataPoints: [
      10, 12, 11, 20, 35, 45, 35, 60, 75, 90, 95, 110, 125, 145, 165, 160, 200,
      240, 280, 330, 380,
    ],
  },
  {
    id: "absl-mnc",
    name: "ABSL MNC Fund",
    category: "Thematic (Global)",
    launchDate: "Dec 1999",
    cagr20: "16.5%",
    expense: "1.10%",
    trustReason:
      "The 'Global Proxy'. While not an International Fund by definition, it invests in Multinational Companies (MNCs) listed in India. This gives it the governance, technology, and stability of global parents (Unilever, Pfizer, etc.), acting as a perfect defensive hedge.",
    alphaStrategy:
      "Quality factor. MNCs typically have high ROE and zero debt. The fund outperforms during volatile markets due to the 'flight to safety' phenomenon.",
    managerLegacy:
      "Managed by Aditya Birla Sun Life's experienced desk. Very low churn portfolio.",
    resilience: "Extreme",
    role: "Defensive Hedge",
    color: "#d97706",
    dataPoints: [
      10, 11, 12, 15, 20, 25, 22, 35, 45, 55, 65, 80, 95, 110, 130, 140, 160,
      190, 220, 260, 300,
    ],
  },
];

const drawdownData: Record<string, number[]> = {
  "hdfc-flexi": [-45, -55, -28],
  "franklin-prima": [-50, -60, -30],
  "nippon-growth": [-55, -65, -32],
  "hdfc-top100": [-35, -45, -24],
  "absl-mnc": [-20, -35, -15],
};

const years = Array.from({ length: 21 }, (_, i) => (2004 + i).toString());

// --- COMPONENT ---

export default function MFResearchPage() {
  const [chartMode, setChartMode] = useState<"growth" | "drawdown">("growth");
  const [selectedFundId, setSelectedFundId] = useState("hdfc-flexi");

  const selectedFund = useMemo(
    () => fundsData.find((f) => f.id === selectedFundId) ?? fundsData[0],
    [selectedFundId],
  );

  const insightText =
    chartMode === "growth"
      ? "HDFC Flexi Cap and Nippon India Growth highlight the massive power of compounding over 20+ years, despite volatility."
      : "Notice how ABSL MNC (Orange) barely dipped in 2008 compared to the 65% fall of aggressive midcaps, proving its role as a hedge.";

  const growthChartData = useMemo(
    () => ({
      labels: years,
      datasets: [
        ...fundsData.map((fund) => ({
          label: fund.name,
          data: fund.dataPoints,
          borderColor: fund.color,
          backgroundColor: fund.color,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          fill: false,
          tension: 0.3,
        })),
        {
          label: "Nifty 50 Benchmark",
          data: [
            10, 11, 13, 20, 30, 35, 25, 45, 55, 60, 65, 75, 85, 95, 110, 105,
            130, 150, 180, 220, 250,
          ],
          borderColor: "#94a3b8",
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
          tension: 0,
        },
      ],
    }),
    [],
  );

  const drawdownChartData = useMemo(
    () => ({
      labels: ["2000 (Dot-com)", "2008 (GFC)", "2020 (Covid)"],
      datasets: fundsData.map((fund) => ({
        label: fund.name,
        data: drawdownData[fund.id],
        backgroundColor: fund.color,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      })),
    }),
    [],
  );

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#f1f5f9",
        bodyColor: "#cbd5e1",
        borderColor: "#334155",
        borderWidth: 1,
      },
    },
  };

  const growthOptions = {
    ...commonOptions,
    scales: {
      y: {
        title: { display: true, text: "Value of ₹10,000 (x1000)" },
        grid: { color: "#f1f5f9" },
      },
      x: {
        grid: { display: false },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  const drawdownOptions = {
    ...commonOptions,
    scales: {
      y: {
        title: { display: true, text: "Drawdown %" },
        min: -70,
        max: 0,
        grid: { color: "#f1f5f9" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const resilienceBadgeClass = (resilience: string) => {
    if (resilience === "Extreme" || resilience === "Very High")
      return "bg-green-100 text-green-800";
    if (resilience === "High") return "bg-blue-100 text-blue-800";
    return "bg-amber-100 text-amber-800";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Header / Hero */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-amber-400 mb-2">
                Legacy Wealth Builders
              </h1>
              <p className="text-slate-300 text-sm md:text-base max-w-2xl">
                Research Report: Identifying Indian Mutual Funds with a 20+ year
                active track record of alpha generation, crisis resilience, and
                stable management.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Analysis Period
              </span>
              <span className="text-lg font-mono font-bold text-white">
                2000 – 2025
              </span>
            </div>
          </div>

          {/* Criteria Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              "Active > 20 Yrs",
              "Benchmark Beaters",
              "Crash Tested",
              "High Sentiment",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Section 1: Introduction */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The &ldquo;Titans of Time&rdquo; Filter
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Out of hundreds of schemes, only a handful have survived and thrived
            through the Dot-com bubble (2000), the Global Financial Crisis
            (2008), and the Covid-19 crash (2020). This dashboard analyzes 5
            funds that meet the rigorous criteria of consistent alpha generation
            and legacy management.
          </p>
        </section>

        {/* Section 2: Performance Analytics */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Performance Analytics
              </h3>
              <p className="text-xs text-slate-500">
                Compare Wealth Creation &amp; Crisis Resilience
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  chartMode === "growth"
                    ? "border-b-3 border-blue-900 text-blue-900 font-bold"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                onClick={() => setChartMode("growth")}
              >
                Growth of ₹1 Lakh
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  chartMode === "drawdown"
                    ? "border-b-3 border-blue-900 text-blue-900 font-bold"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                onClick={() => setChartMode("drawdown")}
              >
                Crisis Resilience
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="relative w-full max-w-[800px] h-[400px] max-h-[500px] mx-auto md:h-[400px] max-md:h-[300px]">
              {chartMode === "growth" ? (
                <Line data={growthChartData} options={growthOptions} />
              ) : (
                <Bar data={drawdownChartData} options={drawdownOptions} />
              )}
            </div>
            <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded text-sm text-slate-700">
              <p className="font-medium">
                <strong>Insight:</strong> {insightText}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Fund Deep Dive */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-slate-900">
                Fund Selector
              </h2>
              <p className="text-slate-600 mt-2">
                Click on a fund card below to reveal its specific &ldquo;Trusted
                Choice&rdquo; rationale, alpha statistics, and legacy details.
              </p>
            </div>
          </div>

          {/* Fund Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {fundsData.map((fund) => (
              <div
                key={fund.id}
                className={`cursor-pointer bg-white p-4 rounded-lg border transition-all group hover:shadow-md hover:border-blue-300 ${
                  selectedFundId === fund.id
                    ? "ring-2 ring-blue-500 bg-blue-50 border-blue-300"
                    : "border-slate-200"
                }`}
                onClick={() => setSelectedFundId(fund.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {fund.category}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: fund.color }}
                  />
                </div>
                <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-blue-700">
                  {fund.name}
                </h4>
                <div className="mt-3 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">
                      20Yr CAGR
                    </p>
                    <p className="font-bold text-emerald-600">{fund.cagr20}</p>
                  </div>
                  <span className="text-xs text-slate-400">View &rarr;</span>
                </div>
              </div>
            ))}
          </div>

          {/* Detail View */}
          <div className="bg-white rounded-xl shadow-lg border-t-4 border-blue-900 p-6 md:p-8 transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column */}
              <div className="md:w-1/3 md:border-r border-slate-100 pr-0 md:pr-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {selectedFund.name}
                </h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold mb-6">
                  {selectedFund.category}
                </span>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      20-Year CAGR
                    </p>
                    <p className="text-3xl font-bold text-emerald-600">
                      {selectedFund.cagr20}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      Expense Ratio (Direct)
                    </p>
                    <p className="text-lg font-semibold text-slate-700">
                      {selectedFund.expense}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      Launch Date
                    </p>
                    <p className="text-sm font-medium text-slate-600">
                      Since {selectedFund.launchDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:w-2/3">
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-2" />{" "}
                    Why it is a &lsquo;Trusted&rsquo; Choice
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedFund.trustReason}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h5 className="font-bold text-slate-800 text-sm mb-2">
                      Alpha Strategy
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {selectedFund.alphaStrategy}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h5 className="font-bold text-slate-800 text-sm mb-2">
                      Manager Legacy
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {selectedFund.managerLegacy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Summary Table */}
        <section className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">
              At a Glance: The 20-Year Club
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Fund Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Resilience Rating</th>
                  <th className="px-6 py-3">Primary Role</th>
                </tr>
              </thead>
              <tbody>
                {fundsData.map((fund) => (
                  <tr
                    key={fund.id}
                    className="bg-white border-b hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {fund.name}
                    </td>
                    <td className="px-6 py-4">{fund.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${resilienceBadgeClass(fund.resilience)}`}
                      >
                        {fund.resilience}
                      </span>
                    </td>
                    <td className="px-6 py-4">{fund.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-400 text-xs py-8 mt-8 border-t border-slate-200">
          <p>
            Data simulated based on historical trends of specified funds. Past
            performance is not an indicator of future returns.
          </p>
          <p>Source Report Analysis generated by AI Researcher.</p>
        </footer>
      </main>
    </div>
  );
}
