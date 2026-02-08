"use client";

import SocialIcons from "./SocialIcons";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

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
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </span>
          </div>

          {/* Social Links */}
          <SocialIcons variant="footer" />
        </div>
      </div>
    </motion.footer>
  );
}
