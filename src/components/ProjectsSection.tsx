"use client";

import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

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

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <SectionHeading title="Projects" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="group card overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <ExternalLink className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Link */}
            <Link
              href={project.link}
              className="inline-flex items-center gap-2 text-primary font-medium group/link"
            >
              <span>View Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
