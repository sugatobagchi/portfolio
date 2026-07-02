"use client";

import { useTheme } from "next-themes";
import { about } from "@/data/about";
import { profileImageSrc } from "@/content";
import Header from "./Header";
import Hero from "./Hero";
import LandingIntro from "./LandingIntro";
import Footer from "./Footer";
import FloatingThemeToggle from "./FloatingThemeToggle";
import { useEffect, useState } from "react";
import { features } from "@/config/features";

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => setTheme(theme === "dark" ? "light" : "dark");

  const navItems = features.filter((feature) => feature.enabled);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header navItems={navItems} />
      <main className="flex-1 w-full max-w-6xl mx-auto px-6">
        <Hero name={about.name} tagline={about.intro} avatarUrl={profileImageSrc} />
        <LandingIntro />
      </main>
      <Footer />
      {mounted && (
        <FloatingThemeToggle
          theme={theme ?? "dark"}
          onToggle={handleThemeToggle}
        />
      )}
    </div>
  );
}
