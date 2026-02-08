"use client";

import { socials } from "@/data/socials";
import Link from "next/link";
import { SiGithub, SiLinkedin, SiX, SiInstagram } from "react-icons/si";
import { motion, useAnimation } from "framer-motion";
import { useState, useCallback, useEffect } from "react";

const socialIconMap: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  GitHub: { icon: SiGithub, color: "hover:bg-[#333] hover:text-white" },
  LinkedIn: { icon: SiLinkedin, color: "hover:bg-[#0A66C2] hover:text-white" },
  X: {
    icon: SiX,
    color:
      "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
  },
  Instagram: {
    icon: SiInstagram,
    color:
      "hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:text-white",
  },
};

interface SocialIconsProps {
  variant?: "hero" | "footer";
  className?: string;
}

function SocialIcon({
  social,
  index,
  variant,
}: {
  social: { name: string; url: string };
  index: number;
  variant: "hero" | "footer";
}) {
  const config = socialIconMap[social.name];
  const controls = useAnimation();

  useEffect(() => {
    if (variant === "hero") {
      controls.start({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          delay: 0.8 + index * 0.1,
          type: "spring",
          stiffness: 200,
        },
      });
    } else {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.1 },
      });
    }
  }, [variant, index, controls]);

  const handleHoverStart = useCallback(() => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    const angle = variant === "hero" ? 10 : 8;

    controls.start({
      scale: variant === "hero" ? 1.2 : 1.15,
      y: variant === "hero" ? -5 : -4,
      rotate: angle * direction,
      boxShadow:
        variant === "hero"
          ? "0 10px 30px -10px rgba(59, 130, 246, 0.5)"
          : "none",
      transition: { duration: 0.3, type: "spring", stiffness: 300 },
    });
  }, [variant, controls]);

  const handleHoverEnd = useCallback(() => {
    controls.start({
      scale: 1,
      y: 0,
      rotate: 0,
      boxShadow: "none",
      transition: { duration: 0.3 },
    });
  }, [controls]);

  if (!config) return null;
  const Icon = config.icon;

  if (variant === "hero") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={controls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border/50 transition-all shadow-lg hover:border-primary/50 ${config.color}`}
        >
          <Icon className="w-5 h-5" />
        </Link>
      </motion.div>
    );
  }

  // Footer variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={controls}
      onViewportEnter={() => {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.1 },
        });
      }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileTap={{ scale: 0.9 }}
    >
      <Link
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
        className={`flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 text-muted-foreground transition-all duration-300 ${config.color}`}
      >
        <Icon className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

export default function SocialIcons({
  variant = "hero",
  className = "",
}: SocialIconsProps) {
  return (
    <div
      className={`flex gap-3 ${variant === "footer" ? "gap-4" : ""} ${className}`}
    >
      {socials.map((social, index) => (
        <SocialIcon
          key={social.name}
          social={social}
          index={index}
          variant={variant}
        />
      ))}
    </div>
  );
}
