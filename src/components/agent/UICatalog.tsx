"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import { about } from "@/data/about";

const LOCATION_QUERY = "Kolkata, West Bengal, India";
const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const portfolioCatalog = {
  Timeline: ({
    items = [],
  }: {
    items?: {
      company: string;
      role: string;
      period: string;
      outcome: string;
    }[];
  }) => (
    <div className="mt-3 flex flex-col">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.18, type: "spring", stiffness: 260, damping: 22 }}
            className="relative rounded-xl border border-border bg-card p-3 overflow-hidden"
          >
            {/* Current badge */}
            {i === 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12, type: "spring", stiffness: 300, damping: 20 }}
                className="absolute top-2.5 right-2.5 text-[9px] font-bold tracking-widest uppercase text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded-full"
              >
                Current
              </motion.span>
            )}

            {/* Top accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.18 + 0.08, duration: 0.3, ease: "easeOut" }}
              style={{ originX: 0 }}
              className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-emerald-500/60 via-emerald-400/30 to-transparent"
            />

            <p className="text-[10px] text-emerald-500 font-mono mb-0.5 tabular-nums">{item.period}</p>
            <h3 className="text-sm font-bold text-foreground leading-tight pr-12">{item.role}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 mb-1.5">{item.company}</p>
            {item.outcome && (
              <p className="text-[11px] text-muted-foreground leading-relaxed border-t border-border/60 pt-1.5">
                {item.outcome}
              </p>
            )}
          </motion.div>

          {/* Downward connector between cards */}
          {i < items.length - 1 && (
            <div className="flex flex-col items-center py-0.5">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.18 + 0.22, duration: 0.2, ease: "easeOut" }}
                style={{ originY: 0 }}
                className="w-px h-4 bg-linear-to-b from-emerald-500/50 to-emerald-500/20"
              />
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.18 + 0.36, type: "spring", stiffness: 400, damping: 20 }}
              >
                <ChevronDown className="w-3.5 h-3.5 text-emerald-500/70" strokeWidth={2.5} />
              </motion.div>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.18 + 0.38, duration: 0.2, ease: "easeOut" }}
                style={{ originY: 0 }}
                className="w-px h-4 bg-linear-to-b from-emerald-500/20 to-transparent"
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  ),

  LocationMap: () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-4 rounded-xl overflow-hidden border border-zinc-800 shadow-lg"
    >
      <div className="h-48 w-full bg-zinc-900">
        {mapsApiKey ? (
          <GoogleMapsEmbed
            apiKey={mapsApiKey}
            height={192}
            width="100%"
            mode="place"
            q={LOCATION_QUERY}
            loading="lazy"
            style="border:0"
          />
        ) : (
          <iframe
            title={`${about.name} location map`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(LOCATION_QUERY)}&hl=en&z=14&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
      <p className="px-3 py-2 text-xs text-muted-foreground bg-card border-t border-border">
        {about.location} — {about.tagline}
      </p>
    </motion.div>
  ),

  SkillGrid: ({
    category,
    skills = [],
    sections,
  }: {
    category?: string;
    skills?: string[];
    sections?: { name: string; color?: string; icon?: string; skills: string[] }[];
  }) => {
    type PaletteKey = "emerald" | "violet" | "sky" | "amber";
    const palette: Record<PaletteKey, { card: string; badge: string; chip: string; dot: string }> = {
      emerald: {
        card: "border-emerald-500/30 bg-emerald-500/5",
        badge: "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-300",
        chip: "bg-background border-emerald-500/35 text-foreground hover:border-emerald-500/70 hover:bg-emerald-500/10",
        dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]",
      },
      violet: {
        card: "border-violet-500/30 bg-violet-500/5",
        badge: "bg-violet-500/15 border-violet-500/40 text-violet-600 dark:text-violet-300",
        chip: "bg-background border-violet-500/35 text-foreground hover:border-violet-500/70 hover:bg-violet-500/10",
        dot: "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.7)]",
      },
      sky: {
        card: "border-sky-500/30 bg-sky-500/5",
        badge: "bg-sky-500/15 border-sky-500/40 text-sky-600 dark:text-sky-300",
        chip: "bg-background border-sky-500/35 text-foreground hover:border-sky-500/70 hover:bg-sky-500/10",
        dot: "bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.7)]",
      },
      amber: {
        card: "border-amber-500/30 bg-amber-500/5",
        badge: "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-300",
        chip: "bg-background border-amber-500/35 text-foreground hover:border-amber-500/70 hover:bg-amber-500/10",
        dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]",
      },
    };

    const allSections =
      sections && sections.length > 0
        ? sections
        : [{ name: category ?? "Tech Stack", color: "emerald", skills }];

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
        className="mt-4 flex flex-col gap-3"
      >
        {allSections.map((section, si) => {
          const colors =
            palette[(section.color as PaletteKey) ?? "emerald"] ?? palette.emerald;
          return (
            <motion.div
              key={si}
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.97 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
              }}
              className={`rounded-xl border p-3 ${colors.card}`}
            >
              {/* Section header */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot}`} />
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold tracking-wide ${colors.badge}`}>
                  {section.icon ?? (si === 0 ? "⚡" : "🤖")} {section.name}
                </span>
              </div>

              {/* Skill chips */}
              <motion.div
                className="flex flex-wrap gap-1.5"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.045, delayChildren: 0.05 + si * 0.1 },
                  },
                }}
              >
                {section.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, scale: 0.75 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { type: "spring", stiffness: 340, damping: 20 },
                      },
                    }}
                    whileHover={{ scale: 1.06 }}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border cursor-default select-none transition-colors ${colors.chip}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  },

  VolunteerList: ({
    items = [],
  }: {
    items?: { org: string; role: string; desc: string }[];
  }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-3 mt-4"
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-card border border-border p-3 rounded-xl border-l-4 border-l-emerald-500 shadow-sm"
        >
          <h3 className="text-base font-bold text-foreground">{item.role}</h3>
          <p className="text-sm font-medium text-emerald-400 mb-2">
            {item.org}
          </p>
          <p
            className="text-xs text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.desc }}
          />
        </div>
      ))}
    </motion.div>
  ),
} as const;
