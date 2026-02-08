"use client";

import { skills } from "@/data/skills";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { Code2, Layers, Database, Cloud, Heart } from "lucide-react";

const categories = [
  {
    key: "languages",
    label: "Languages",
    icon: Code2,
    color: "from-blue-500 to-cyan-400",
  },
  {
    key: "frameworks",
    label: "Frameworks",
    icon: Layers,
    color: "from-violet-500 to-purple-400",
  },
  {
    key: "databases",
    label: "Databases",
    icon: Database,
    color: "from-emerald-500 to-teal-400",
  },
  {
    key: "platforms",
    label: "Platforms",
    icon: Cloud,
    color: "from-orange-500 to-amber-400",
  },
  {
    key: "softSkills",
    label: "Soft Skills",
    icon: Heart,
    color: "from-pink-500 to-rose-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20">
      <SectionHeading title="Skills" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((category, categoryIdx) => {
          const Icon = category.icon;
          const skillList = skills[category.key as keyof typeof skills];
          if (!skillList || skillList.length === 0) return null;

          return (
            <motion.div
              key={category.key}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="card p-6 group"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {category.label}
                </h3>
              </div>

              {/* Skills */}
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-2"
              >
                {skillList.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    variants={badgeVariants}
                    transition={{ delay: categoryIdx * 0.05 + skillIdx * 0.03 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/30 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
