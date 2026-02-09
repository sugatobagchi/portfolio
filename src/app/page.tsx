import Portfolio from "@/components/portfolio";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  return (
    <div className="">
      <Portfolio />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
