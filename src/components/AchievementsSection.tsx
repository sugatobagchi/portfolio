"use client";

import { achievements } from "@/data/achievements";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { Trophy, Medal, Award, Star, Sparkles } from "lucide-react";

const icons = [Trophy, Medal, Award, Star, Sparkles];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20">
      <SectionHeading title="Achievements" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-4"
      >
        {achievements.map((ach, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ x: 8, scale: 1.01 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-primary/20 transition-all group cursor-default"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p
                className="text-muted-foreground leading-relaxed pt-2 [&>strong]:text-primary [&>strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: ach }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
