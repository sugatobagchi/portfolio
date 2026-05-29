"use client";

import { socials } from "@/data/socials";
import Link from "next/link";
import { SiGithub, SiX, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const socialIconMap: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
  }
> = {
  GitHub: {
    icon: SiGithub,
    color: "group-hover:text-white",
    bg: "group-hover:bg-[#333]",
  },
  LinkedIn: {
    icon: FaLinkedin,
    color: "group-hover:text-white",
    bg: "group-hover:bg-[#0A66C2]",
  },
  X: {
    icon: SiX,
    color: "group-hover:text-white",
    bg: "group-hover:bg-black dark:group-hover:bg-white dark:group-hover:text-black",
  },
  Instagram: {
    icon: SiInstagram,
    color: "group-hover:text-white",
    bg: "group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:via-pink-500 group-hover:to-orange-400",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function SocialsSection() {
  return (
    <section id="socials" className="py-20">
      <SectionHeading title="Let's Connect" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap justify-center gap-6"
      >
        {socials.map((social) => {
          const config = socialIconMap[social.name];
          if (!config) return null;
          const Icon = config.icon;

          return (
            <motion.div key={social.name} variants={itemVariants}>
              <Link
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex flex-col items-center gap-3 p-6 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all ${config.bg}`}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center transition-all ${config.bg}`}
                  >
                    <Icon
                      className={`w-8 h-8 text-muted-foreground transition-colors ${config.color}`}
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {social.name}
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
