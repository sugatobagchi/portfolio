"use client";

import { about } from "@/data/about";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { Sparkles, Code2, Users, Target } from "lucide-react";

const icons = [Code2, Users, Target, Sparkles, Code2];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <SectionHeading title="About Me" />

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card gradient-border p-8"
        >
          <p className="text-lg leading-relaxed text-foreground">
            {about.intro}
          </p>
        </motion.div>

        {/* Details List */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {about.details.map((detail, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-muted-foreground leading-relaxed pt-1.5">
                  {detail}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
