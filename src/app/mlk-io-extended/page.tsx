"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Presentation,
  Github,
  Globe,
  Cpu,
  Sparkles,
  Bot,
  ArrowRight,
  BookOpen,
  FileText,
  LayoutGrid,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiX } from "react-icons/si";
import HeroBackground from "@/components/HeroBackground";
import { profileImageSrc, siteContent } from "@/content";
import { cn } from "@/lib/utils";

type LinkItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const primaryLinks: LinkItem[] = [
  {
    label: "Try Out Edge AI ",
    href: "https://edge.sugatobagchi.com/",
    icon: ExternalLink,
  },
  {
    label: "Blog Post",
    href: "/blogs/webgpu-gemma-agents",
    icon: FileText,
  },
  {
    label: "Slides",
    href: "https://docs.google.com/presentation/d/e/2PACX-1vQlV1-8_ba3Sk5ic8BxhmIf8KQoy_hR0k1gVAGHG3n-ivjon2HHa2-UZwI0TvagrivuDWgiCZlE-mLQ/pub",
    icon: Presentation,
  },
  {
    label: "Code",
    href: "https://github.com/sugatobagchi/gemma-agents-webgpu",
    icon: Github,
  },
];

const connectLinks: LinkItem[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sugatobagchi",
    icon: FaLinkedin,
  },
  {
    label: "Twitter",
    href: "https://x.com/sugatobagchi",
    icon: SiX,
  },
];

const resourceLinks: LinkItem[] = [
  {
    label: "AI Edge",
    href: "https://developers.google.com/edge",
    icon: Globe,
  },
  {
    label: "AI Edge Gallery",
    href: "https://developers.google.com/edge/gallery",
    icon: LayoutGrid,
  },
  {
    label: "LiteRT",
    href: "https://developers.google.com/edge/litert",
    icon: Cpu,
  },
  {
    label: "LiteRT-LM Docs",
    href: "https://developers.google.com/edge/litert-lm/overview",
    icon: FileText,
  },
  {
    label: "LiteRT-LM GitHub",
    href: "https://github.com/google-ai-edge/LiteRT-LM",
    icon: Github,
  },
  {
    label: "MediaPipe",
    href: "https://developers.google.com/edge/mediapipe/solutions/guide",
    icon: Sparkles,
  },
  {
    label: "Gemma 4",
    href: "https://deepmind.google/models/gemma/gemma-4/",
    icon: Bot,
  },
  {
    label: "AI Studio",
    href: "https://aistudio.google.com/",
    icon: ExternalLink,
  },
];

function LinkButton({
  item,
  variant = "primary",
  index,
}: {
  item: LinkItem;
  variant?: "primary" | "secondary";
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.06 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group flex w-full items-center gap-3 rounded-2xl border px-5 py-4 text-sm font-medium transition-colors",
        variant === "primary"
          ? "border-primary/30 bg-primary text-primary-foreground shadow-lg shadow-primary/15 hover:bg-primary/90"
          : "border-border/60 bg-card/80 text-foreground hover:border-primary/30 hover:bg-card",
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
          variant === "primary"
            ? "bg-primary-foreground/15"
            : "bg-muted group-hover:bg-primary/10",
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-left">{item.label}</span>
      <ExternalLink
        className={cn(
          "h-4 w-4 shrink-0 opacity-60 transition-opacity group-hover:opacity-100",
          variant === "primary" ? "text-primary-foreground" : "text-muted-foreground",
        )}
      />
    </motion.a>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </h2>
  );
}

export default function MlkIoExtendedPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-12 text-foreground sm:px-6 sm:py-16">
      <HeroBackground />

      <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 scale-125"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-accent/20 scale-[1.35]"
          />
          <Image
            src={profileImageSrc}
            alt={siteContent.name}
            fill
            className="object-cover object-top rounded-full shadow-2xl"
            priority
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-2 text-center text-2xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {siteContent.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mb-8 max-w-xs text-center text-sm text-muted-foreground"
        >
          Thanks for joining — here are the links from the talk.
        </motion.p>

        <div className="flex w-full flex-col gap-3">
          {primaryLinks.map((item, index) => (
            <LinkButton key={item.label} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 w-full"
        >
          <SectionHeading>Connect</SectionHeading>
          <div className="flex flex-col gap-3">
            {connectLinks.map((item, index) => (
              <LinkButton
                key={item.label}
                item={item}
                variant="secondary"
                index={index + primaryLinks.length}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 w-full"
        >
          <SectionHeading>Resources</SectionHeading>
          <div className="flex flex-col gap-3">
            {resourceLinks.map((item, index) => (
              <LinkButton
                key={item.label}
                item={item}
                variant="secondary"
                index={index + primaryLinks.length + connectLinks.length}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 w-full"
        >
          <SectionHeading>Blogs</SectionHeading>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.65 }}
          >
            <Link href="/blogs" className="block">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group card relative overflow-hidden p-5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Read my blogs</p>
                    <p className="text-xs text-muted-foreground">
                      Things I write about tech, AI, and more
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
