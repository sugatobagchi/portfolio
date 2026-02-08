"use client";

import { volunteer } from "@/data/volunteer";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { Users, Calendar } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function VolunteerSection() {
  return (
    <section id="volunteer" className="py-20">
      <SectionHeading title="Volunteer & Community" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {volunteer.map((item, idx) => (
          <motion.div
            key={item.organization}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="card p-6 group relative overflow-hidden"
          >
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Users className="w-6 h-6 text-primary" />
            </div>

            {/* Content */}
            <h3
              className="text-lg font-bold mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.role}
            </h3>
            <p className="text-primary font-medium text-sm mb-3">
              @ {item.organization}
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Calendar className="w-3.5 h-3.5" />
              {item.period}
            </div>

            <p
              className="text-sm text-muted-foreground leading-relaxed [&>strong]:text-primary [&>strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
