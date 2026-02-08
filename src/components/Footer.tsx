"use client";

import { socials } from "@/data/socials";
import Link from "next/link";
import { SiGithub, SiLinkedin, SiX, SiInstagram } from "react-icons/si";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const socialIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  GitHub: SiGithub,
  LinkedIn: SiLinkedin,
  X: SiX,
  Instagram: SiInstagram,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative mt-20 py-12 border-t border-border/50"
    >
      {/* Gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear}</span>
            <span className="text-gradient font-semibold">Sugato Bagchi</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:flex items-center gap-1">
              Built with{" "}
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> using
              Next.js
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socials.map((social, index) => {
              const Icon = socialIconMap[social.name];
              if (!Icon) return null;
              return (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
