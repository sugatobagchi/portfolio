import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legacy Wealth Builders: Indian Mutual Fund Research",
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
