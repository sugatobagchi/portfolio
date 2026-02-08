"use client";

import PageLayout from "@/components/PageLayout";
import { experience } from "@/data/experience";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ExperiencePage() {
  return (
    <PageLayout>
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-center mb-16"
          >
            <h1
              className="text-3xl sm:text-4xl md:text-6xl font-black mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Work <span className="text-primary">Experience</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Building scalable systems and leading impactful projects
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

            <div className="space-y-12">
              {experience.map((exp, idx) => (
                <motion.div
                  key={exp.company}
                  variants={cardVariants}
                  className="relative pl-12 sm:pl-16 md:pl-24"
                >
                  {/* Timeline node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.15 + 0.3 }}
                    className="absolute left-0 md:left-4 w-8 h-8 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-lg shadow-primary/30"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="card p-4 sm:p-6 md:p-8 hover:shadow-xl hover:shadow-primary/10 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                      <div>
                        <h2
                          className="text-xl sm:text-2xl font-bold mb-2"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {exp.role}
                        </h2>
                        <p className="text-primary font-semibold flex items-center gap-2 flex-wrap">
                          <span>
                            @{" "}
                            {exp.url ? (
                              <Link
                                href={exp.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline inline-flex items-center gap-1"
                              >
                                {exp.company}
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                            ) : (
                              exp.company
                            )}
                          </span>
                          {exp.location && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                              <span className="text-muted-foreground text-sm flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {exp.location}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full w-fit">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                    </div>

                    <ul className="space-y-4">
                      {exp.details.map((detail, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.4 }}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span
                            dangerouslySetInnerHTML={{ __html: detail }}
                            className="[&>strong]:text-primary [&>strong]:font-semibold leading-relaxed"
                          />
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
