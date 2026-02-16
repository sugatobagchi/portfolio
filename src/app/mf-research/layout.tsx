import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legacy Wealth Builders: Indian Mutual Fund Research",
  description:
    "Pure research on India's most resilient mutual funds. 20+ years of NAV data analyzed across 400+ schemes to identify 5 legacy wealth builders that survived every major market crash.",
  openGraph: {
    title: "Legacy Alpha — Indian Mutual Fund Research",
    description:
      "20+ years of NAV data analyzed. 5 funds filtered from 400+ schemes. Pure research on India's most resilient mutual funds.",
    url: "https://sugatobagchi.com/mf-research",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legacy Alpha — Indian Mutual Fund Research",
    description:
      "20+ years of NAV data analyzed. 5 funds filtered from 400+ schemes. Pure research on India's most resilient mutual funds.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function MFResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
