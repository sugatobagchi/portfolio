import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build On-Device AI",
  description:
    "Links from Build On-Device AI — try the demo, grab the slides, explore the code, and connect.",
  openGraph: {
    title: "Build On-Device AI",
    description:
      "Try the demo, grab the slides, explore the code, and connect after the talk.",
    url: "https://sugatobagchi.com/build-on-device-ai",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Build On-Device AI",
    description:
      "Try the demo, grab the slides, explore the code, and connect after the talk.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function BuildOnDeviceAiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
