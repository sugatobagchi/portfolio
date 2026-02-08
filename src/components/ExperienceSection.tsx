"use client";

import { experience } from "@/data/experience";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { Briefcase, MapPin, Calendar } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <SectionHeading title="Experience" />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

        <div className="space-y-8">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-12 md:pl-20"
            >
              {/* Timeline node */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
                className="absolute left-0 md:left-4 w-8 h-8 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-lg shadow-primary/30"
              >
                <Briefcase className="w-3.5 h-3.5 text-primary" />
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="card p-6 hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-primary font-semibold flex items-center gap-2">
                      <span>
                        @{" "}
                        {exp.url ? (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                      </span>
                      {exp.location && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <span className="text-muted-foreground text-sm flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full w-fit">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.details.map((detail, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + i * 0.05 + 0.3 }}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
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
      </div>
    </section>
  );
}
