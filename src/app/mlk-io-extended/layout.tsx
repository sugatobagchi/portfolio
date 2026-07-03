import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ML on Edge — Talk Resources",
  description:
    "Links from my talk on running AI on the edge — try the demo, grab the slides, explore the code, and connect.",
  openGraph: {
    title: "ML on Edge — Talk Resources",
    description:
      "Try the demo, grab the slides, explore the code, and connect after the talk.",
    url: "https://sugatobagchi.com/mlk-io-extended",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ML on Edge — Talk Resources",
    description:
      "Try the demo, grab the slides, explore the code, and connect after the talk.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function MlkIoExtendedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
