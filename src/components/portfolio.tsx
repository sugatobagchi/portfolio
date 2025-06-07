"use client";

import { useTheme } from "next-themes";
import { about } from "@/data/about";
import Header from "./Header";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import ExperienceSection from "./ExperienceSection";
import VolunteerSection from "./VolunteerSection";
import SkillsSection from "./SkillsSection";
import AchievementsSection from "./AchievementsSection";
import SocialsSection from "./SocialsSection";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { features } from "@/config/features";

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => setTheme(theme === "dark" ? "light" : "dark");

  if (!mounted) {
    return null;
  }

  // Filter enabled features for navbar
  const navItems = features.filter((feature) => feature.enabled);

  // Component mapping
  const components = {
    about: <AboutSection />,
    projects: <ProjectsSection />,
    experience: <ExperienceSection />,
    volunteer: <VolunteerSection />,
    skills: <SkillsSection />,
    achievements: <AchievementsSection />,
    socials: <SocialsSection />,
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header
        navItems={navItems}
        onThemeToggle={handleThemeToggle}
        theme={theme ?? "dark"}
      />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4">
        <Hero name={about.name} tagline={about.intro} avatarUrl={"/me.webp"} />
        {features
          .filter((feature) => feature.enabled)
          .map((feature) => (
            <div key={feature.id}>
              {components[feature.id as keyof typeof components]}
            </div>
          ))}
      </main>
      <Footer />
    </div>
  );
}
