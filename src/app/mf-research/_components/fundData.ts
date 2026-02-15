// Fund data types and database for the MF Research page

export interface FundResilience {
  t2000: string;
  t2008: string;
  t2020: string;
}

export interface FundData {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  category: string;
  launch: string;
  aum: string;
  expense: string;
  cagr20: string;
  alpha: string;
  beta: string;
  risk: string;
  color: string;
  manager: string;
  desc: string;
  resilience: FundResilience;
  whyTrusted: string;
  holdings: string[];
  chartData: number[];
  tag: string;
  emoji: string;
}

export const fundDB: Record<string, FundData> = {
  "hdfc-flexi": {
    id: "hdfc-flexi",
    name: "HDFC Flexi Cap Fund",
    shortName: "HDFC Flexi",
    tagline: "The Contrarian Giant",
    category: "Flexi Cap",
    launch: "Jan 1, 1995",
    aum: "₹65,000 Cr+",
    expense: "0.88%",
    cagr20: "18.5%",
    alpha: "+2.5%",
    beta: "0.98",
    risk: "High",
    color: "#3b82f6",
    emoji: "🏛️",
    manager: "Roshi Jain (Legacy: Prashant Jain)",
    desc: "Formerly HDFC Equity. Famous for taking massive contrarian bets (e.g., buying corporate banks when they were hated in 2018). It is a proxy for the Indian economy's capex cycle.",
    resilience: { t2000: "-45%", t2008: "-55%", t2020: "-28%" },
    whyTrusted:
      "It doesn't chase fads. The fund underperformed significantly in 2015-16 by avoiding expensive consumption stocks, only to rebound massively in 2021-23. Investors trust the 'Style Discipline'.",
    holdings: ["ICICI Bank", "SBI", "NTPC", "Infosys"],
    chartData: [
      10, 14, 12, 25, 45, 60, 40, 75, 90, 110, 105, 140, 160, 200, 240, 220,
      280, 350, 420, 500, 580,
    ],
    tag: "Lrg",
  },
  "franklin-prima": {
    id: "franklin-prima",
    name: "Franklin India Prima Fund",
    shortName: "Franklin Prima",
    tagline: "The Mid-Cap Veteran",
    category: "Mid Cap",
    launch: "Dec 1, 1993",
    aum: "₹10,000 Cr+",
    expense: "1.05%",
    cagr20: "19.2%",
    alpha: "+3.1%",
    beta: "0.85",
    risk: "Mod-High",
    color: "#10b981",
    emoji: "🚀",
    manager: "R. Janakiraman",
    desc: "One of India's oldest mid-cap funds. Unlike aggressive peers, Franklin focuses on ROCE and clean cash flows. It avoids leverage-heavy midcaps, which saved it during the 2018 midcap meltdown.",
    resilience: { t2000: "-50%", t2008: "-60%", t2020: "-30%" },
    whyTrusted:
      "Consistency. In a category prone to blow-ups, Prima has never had a liquidity crisis or a major governance scandal in its portfolio holdings.",
    holdings: ["Crompton Greaves", "Federal Bank", "Deepak Nitrite"],
    chartData: [
      10, 11, 15, 30, 65, 80, 45, 90, 110, 130, 120, 160, 200, 250, 290, 270,
      350, 450, 500, 600, 700,
    ],
    tag: "Mid",
  },
  "nippon-growth": {
    id: "nippon-growth",
    name: "Nippon India Growth Fund",
    shortName: "Nippon Growth",
    tagline: "The Wealth Multiplier",
    category: "Mid Cap",
    launch: "Oct 8, 1995",
    aum: "₹27,000 Cr+",
    expense: "1.08%",
    cagr20: "21.5%",
    alpha: "+4.2%",
    beta: "1.12",
    risk: "Very High",
    color: "#ec4899",
    emoji: "⚡",
    manager: "Rupesh Patel / Manish Gunwani",
    desc: "Formerly Reliance Growth. It is a high-beta fund that aims to identify the 'next large caps'. It thrives in bull markets, often outperforming the index by wide margins (2003-2007, 2014-2017).",
    resilience: { t2000: "-55%", t2008: "-65%", t2020: "-32%" },
    whyTrusted:
      "Track record of identifying multi-baggers early. It was the first fund in India to cross NAV of ₹1000.",
    holdings: ["Varun Beverages", "Max Financial", "Cholamandalam"],
    chartData: [
      10, 12, 18, 40, 90, 100, 50, 110, 140, 170, 160, 210, 280, 340, 380, 360,
      480, 600, 700, 850, 950,
    ],
    tag: "Agg",
  },
  "hdfc-top100": {
    id: "hdfc-top100",
    name: "HDFC Top 100 Fund",
    shortName: "HDFC Top 100",
    tagline: "The Safety Anchor",
    category: "Large Cap",
    launch: "Oct 11, 1996",
    aum: "₹30,000 Cr+",
    expense: "0.95%",
    cagr20: "17.8%",
    alpha: "+1.2%",
    beta: "0.92",
    risk: "Moderate",
    color: "#8b5cf6",
    emoji: "🛡️",
    manager: "Rahul Baijal",
    desc: "Strictly adheres to the Top 100 companies by market cap. It is the definition of 'blue-chip' investing. When midcaps crash, money flocks here.",
    resilience: { t2000: "-35%", t2008: "-45%", t2020: "-24%" },
    whyTrusted:
      "Liquidity and Safety. Even in the worst market freeze, this fund can liquidate its portfolio in days. Essential for large corpus preservation.",
    holdings: ["Reliance Ind", "HDFC Bank", "L&T", "ITC"],
    chartData: [
      10, 12, 11, 20, 35, 45, 35, 60, 75, 90, 95, 110, 125, 145, 165, 160, 200,
      240, 280, 330, 380,
    ],
    tag: "Val",
  },
  "absl-mnc": {
    id: "absl-mnc",
    name: "Aditya Birla Sun Life MNC",
    shortName: "ABSL MNC",
    tagline: "The Global Proxy",
    category: "Thematic (MNC)",
    launch: "Dec 27, 1999",
    aum: "₹4,000 Cr+",
    expense: "1.10%",
    cagr20: "16.5%",
    alpha: "Defensive",
    beta: "0.75",
    risk: "Low-Mod",
    color: "#f59e0b",
    emoji: "🌍",
    manager: "Dhaval Shah",
    desc: "International Exposure Proxy: While not an overseas fund, it invests in Indian subsidiaries of global giants (Unilever, Pfizer, Bosch). These companies follow global governance standards and their stock prices often have low correlation with typical Indian cyclicals.",
    resilience: { t2000: "-20%", t2008: "-35%", t2020: "-15%" },
    whyTrusted:
      "It is a fortress. During the 2008 and 2011 market falls, MNC stocks barely corrected because of their high dividends and debt-free balance sheets.",
    holdings: ["HUL", "Nestle India", "Siemens", "Honeywell"],
    chartData: [
      10, 11, 12, 15, 20, 25, 22, 35, 45, 55, 65, 80, 95, 110, 130, 140, 160,
      190, 220, 260, 300,
    ],
    tag: "Glb",
  },
};

export const fundIds = Object.keys(fundDB);
export const years = Array.from({ length: 21 }, (_, i) =>
  (2004 + i).toString(),
);
