"use client";

import { about } from "@/data/about";
import { motion } from "framer-motion";
import { Code2, Lightbulb, Rocket, Briefcase } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const icons = [Code2, Lightbulb, Rocket, Briefcase];

export default function AboutSection() {
  const mainSections = [
    "whatIDo",
    "myApproach",
    "craftAndGrowth",
    "experience",
  ];

  return (
    <section id="about" className="py-24 border-t border-border/50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {about.intro}
          </p>
        </motion.div>

        {/* Sections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {mainSections.map((key, i) => {
            const section = about.sections[key as keyof typeof about.sections];
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{section.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
