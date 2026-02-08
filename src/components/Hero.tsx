"use client";

import { socials } from "@/data/socials";
import Image from "next/image";
import Link from "next/link";
import { SiGithub, SiLinkedin, SiX, SiInstagram } from "react-icons/si";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

interface HeroProps {
  name: string;
  tagline: string;
  avatarUrl: string;
}

const socialIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  GitHub: SiGithub,
  LinkedIn: SiLinkedin,
  X: SiX,
  Instagram: SiInstagram,
};

const floatingCards = [
  { label: "Software Engineer", delay: 0.4 },
  { label: "Full-Stack Developer", delay: 0.6 },
  { label: "Backend Specialist", delay: 0.8 },
];

export default function Hero({ name, tagline, avatarUrl }: HeroProps) {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12">
      {/* Background gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl -z-10" />

      <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="order-2 lg:order-1"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground italic mb-2"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="block text-foreground">{firstName}</span>
            {lastName && <span className="block text-primary">{lastName}</span>}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed mb-8"
          >
            {tagline}
          </motion.p>

          {/* Email badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground border border-border/50">
              <Mail className="w-4 h-4" />
              sugato.bagchi.of@gmail.com
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex gap-3"
          >
            {socials.map((social, index) => {
              const Icon = socialIconMap[social.name];
              if (!Icon) return null;
              return (
                <motion.div
                  key={social.name}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right side - Image and floating cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative order-1 lg:order-2 flex justify-center"
        >
          {/* Main image container */}
          <div className="relative">
            {/* Subtle glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-2xl scale-110" />

            {/* Profile image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            >
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover rounded-full shadow-2xl"
                priority
              />
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110" />
            </motion.div>

            {/* Floating cards */}
            {floatingCards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: card.delay }}
                className={`absolute ${
                  index === 0
                    ? "top-4 -right-4 md:top-8 md:-right-12"
                    : index === 1
                      ? "top-1/2 -right-8 md:-right-20"
                      : "bottom-12 -right-4 md:bottom-16 md:-right-12"
                }`}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  }}
                  className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl shadow-lg border border-border/50 backdrop-blur-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium whitespace-nowrap">
                    {card.label}
                  </span>
                </motion.div>
              </motion.div>
            ))}

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -left-8 w-6 h-6 border-2 border-primary/30 rounded-full"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-16 -left-12 w-4 h-4 bg-primary/20 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
