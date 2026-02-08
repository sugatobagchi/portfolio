"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LandingIntro() {
  const quickLinks = [
    { label: "About Me", href: "/about", description: "My story & skills" },
    { label: "Experience", href: "/experience", description: "Work history" },
    { label: "Projects", href: "/projects", description: "Things I've built" },
  ];

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Explore my work</span>
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          What I Do
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {quickLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <Link href={link.href}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group card p-8 h-full flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Gradient accent on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <h3
                    className="text-xl font-bold mb-2 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {link.label}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {link.description}
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex items-center gap-2 text-primary font-medium text-sm">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
