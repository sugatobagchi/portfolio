"use client";

import Portfolio from "@/components/portfolio";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { analytics } from "@/lib/firebaseConfig"; // Adjust the import path accordingly
import { logEvent } from "firebase/analytics";

export default function Home() {
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view");
    }
  }, []);

  return (
    <div className="">
      <Portfolio />
      <Analytics />
    </div>
  );
}
