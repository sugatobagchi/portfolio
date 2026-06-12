"use client";

import PageLayout from "@/components/PageLayout";
import { about } from "@/data/about";
import { skills } from "@/data/skills";
import { achievements } from "@/data/achievements";
import { experience } from "@/data/experience";
import { volunteer } from "@/data/volunteer";
import { motion } from "framer-motion";
import {
  Code2,
  Layers,
  Rocket,
  Target,
  GraduationCap,
  Users,
  MapPin,
  Trophy,
  Cpu,
  Zap,
  Heart,
  Briefcase,
  Calendar,
  ExternalLink,
  GitMerge,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const skillCategories = [
  {
    key: "languages",
    label: "LANGUAGES",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
  },
  {
    key: "frameworks",
    label: "FRAMEWORKS",
    icon: Layers,
    color: "from-violet-500 to-purple-500",
  },
  {
    key: "databases",
    label: "DATABASES",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
  },
  {
    key: "platforms",
    label: "PLATFORMS",
    icon: Rocket,
    color: "from-emerald-500 to-teal-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function SectionTitle({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  animate,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  title: string;
  animate?: object;
}) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <motion.div
        className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shadow-lg flex-shrink-0`}
        whileHover={{ rotate: 10, scale: 1.1 }}
        animate={animate}
        transition={{ duration: 0.4 }}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </motion.div>
      <h2
        className="text-2xl sm:text-3xl font-bold"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent ml-2" />
    </div>
  );
}

function InteractiveParagraph({
  children,
  delay = 0,
  highlight = false,
}: {
  children: React.ReactNode;
  delay?: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ x: 6 }}
      className={`relative pl-4 sm:pl-6 border-l-2 transition-all cursor-default ${
        highlight
          ? "border-primary bg-primary/5 py-3 sm:py-4 pr-3 sm:pr-4 rounded-r-xl"
          : "border-border/50 hover:border-primary"
      }`}
    >
      <p
        className={`text-base sm:text-lg leading-relaxed ${highlight ? "text-foreground font-medium" : "text-muted-foreground"}`}
      >
        {children}
      </p>
    </motion.div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="relative inline-block text-primary font-semibold"
      whileHover={{ scale: 1.05 }}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] bg-primary/50"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />
    </motion.span>
  );
}

export default function AboutPage() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <PageLayout>
      <div className="min-h-screen py-16 md:py-24 px-3 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* ── HERO ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-center mb-16 relative"
          >
            {/* Floating decorative elements */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 left-1/4 w-3 h-3 bg-primary/30 rounded-full blur-sm"
            />
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute top-8 right-1/4 w-2 h-2 bg-accent/40 rounded-full blur-sm"
            />

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
                src="/me.png"
                alt={about.name}
                fill
                className="object-cover object-top rounded-full shadow-2xl"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              About <span className="text-gradient">Me</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-muted-foreground flex items-center justify-center gap-2 flex-wrap"
            >
              <motion.span whileHover={{ scale: 1.2, rotate: 10 }}>
                <MapPin className="w-4 h-4 text-primary" />
              </motion.span>
              {about.location}, {about.tagline}
            </motion.p>
          </motion.div>

          {/* ── BIO ── */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 mb-20"
          >
            <InteractiveParagraph delay={0.1}>
              Hey, I am a <Highlight>Software Engineer</Highlight> who genuinely
              enjoys building things, experimenting with new food, and having
              conversations with new people. I am naturally curious and driven
              by the satisfaction of turning ideas into something real and
              usable.
            </InteractiveParagraph>

            <InteractiveParagraph delay={0.15}>
              I am a <Highlight>full-stack developer</Highlight> with a strong
              interest in creating engaging, intuitive, and meaningful digital
              experiences. I enjoy working across the stack, shaping both how
              applications function behind the scenes and how users experience
              them on the surface.
            </InteractiveParagraph>

            <InteractiveParagraph delay={0.2}>
              I bring a fresh perspective to every project, along with a strong
              focus on{" "}
              <Highlight>
                clean design, usability, and thoughtful engineering
              </Highlight>
              . I care about building applications that feel polished,
              purposeful, and easy to use. Not just technically correct.
            </InteractiveParagraph>

            <InteractiveParagraph delay={0.25}>
              With experience across{" "}
              <Highlight>backend and full-stack projects</Highlight>, I am
              comfortable approaching problems from multiple angles and
              delivering well-rounded solutions. I value reliability, clarity,
              and long-term maintainability in everything I build.
            </InteractiveParagraph>

            <InteractiveParagraph delay={0.3} highlight>
              <Target className="inline-block w-5 h-5 mr-2 text-primary" />
              My goal is not just to meet expectations, but to exceed them by
              delivering high-quality, impactful work that people can trust and
              rely on.
            </InteractiveParagraph>
          </motion.section>

          {/* ── CURRENTLY LEARNING ── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="card p-5 sm:p-8 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 border-primary/20 relative overflow-hidden group cursor-default"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 10 }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.3)",
                        "0 0 40px rgba(59, 130, 246, 0.5)",
                        "0 0 20px rgba(59, 130, 246, 0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <GraduationCap className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3
                    className="text-lg sm:text-xl font-bold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Currently Learning
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  I am transitioning deeper into{" "}
                  <strong className="text-primary">machine learning</strong> and
                  actively building my foundation in the field. I am learning
                  PyTorch through the DeepLearning.AI Professional Certificate
                  and exploring how ML can be applied meaningfully in real-world
                  systems.
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* ── SKILLS ── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <SectionTitle
              icon={Cpu}
              iconColor="text-primary"
              iconBg="bg-gradient-to-br from-primary/20 to-accent/20"
              title="Skills & Technologies"
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {skillCategories.map((category) => {
                const skillList = skills[category.key as keyof typeof skills];
                if (!skillList || skillList.length === 0) return null;
                const Icon = category.icon;
                const isHovered = hoveredSkill === category.key;

                return (
                  <motion.div
                    key={category.key}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredSkill(category.key)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className={`card p-5 cursor-default transition-all ${isHovered ? "border-primary/50" : ""}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                        animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <h3 className="text-xs font-bold tracking-[0.15em] text-muted-foreground">
                        {category.label}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, idx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1 rounded-full text-sm bg-muted/50 text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>

          {/* ── WORK EXPERIENCE ── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <SectionTitle
              icon={Briefcase}
              iconColor="text-primary"
              iconBg="bg-gradient-to-br from-primary/15 to-blue-500/15"
              title="Work Experience"
            />

            <div className="relative">
              {/* Timeline vertical line */}
              <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/10" />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-10"
              >
                {experience.map((exp, idx) => (
                  <motion.div
                    key={exp.company}
                    variants={cardVariants}
                    className="relative pl-12"
                  >
                    {/* Timeline node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="absolute left-0 w-7 h-7 rounded-full bg-background border-[3px] border-primary flex items-center justify-center shadow-md shadow-primary/20"
                    >
                      <Briefcase className="w-3 h-3 text-primary" />
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="card p-4 sm:p-6 hover:shadow-xl hover:shadow-primary/10 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                        <div>
                          <h3
                            className="text-lg sm:text-xl font-bold mb-1"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            {exp.role}
                          </h3>
                          <p className="text-primary font-semibold flex items-center gap-2 flex-wrap text-sm">
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
                                  <ExternalLink className="w-3 h-3" />
                                </Link>
                              ) : (
                                exp.company
                              )}
                            </span>
                            {exp.location && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                                <span className="text-muted-foreground text-sm flex items-center gap-1 font-normal">
                                  <MapPin className="w-3 h-3" />
                                  {exp.location}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full w-fit shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {exp.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span
                              dangerouslySetInnerHTML={{ __html: detail }}
                              className="[&>strong]:text-primary [&>strong]:font-semibold leading-relaxed text-sm sm:text-base"
                            />
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* ── ACHIEVEMENTS ── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <SectionTitle
              icon={Trophy}
              iconColor="text-amber-500"
              iconBg="bg-gradient-to-br from-amber-400/20 to-orange-500/20"
              title="Awards & Achievements"
              animate={{ rotate: [0, 8, -8, 0] }}
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {achievements.map((ach, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-muted/30 hover:bg-gradient-to-r hover:from-amber-500/5 hover:to-transparent border border-transparent hover:border-amber-500/20 transition-all cursor-default group"
                >
                  <motion.span
                    className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                  <p
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed [&>strong]:text-amber-500 [&>strong]:font-semibold group-hover:text-foreground transition-colors"
                    dangerouslySetInnerHTML={{ __html: ach }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* ── COMMUNITY ── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <SectionTitle
              icon={Users}
              iconColor="text-primary"
              iconBg="bg-gradient-to-br from-primary/15 to-accent/15"
              title="Community & Mentorship"
            />

            {/* Summary blurb */}
            <motion.div
              whileHover={{ scale: 1.01, y: -3 }}
              className="card p-5 sm:p-7 mb-6 relative overflow-hidden group cursor-default border-primary/10"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                </motion.div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  I am deeply invested in people and the communities that grow
                  around technology.
                </p>
              </div>
            </motion.div>

            {/* Volunteer timeline */}
            <div className="relative">
              <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary/50 to-transparent" />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {volunteer.map((item, idx) => (
                  <motion.div
                    key={item.organization}
                    variants={cardVariants}
                    className="relative pl-12"
                  >
                    {/* Node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="absolute left-0 w-7 h-7 rounded-full bg-background border-[3px] border-accent flex items-center justify-center shadow-md shadow-accent/20"
                    >
                      <GitMerge className="w-3 h-3 text-accent" />
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="card p-4 sm:p-5 hover:shadow-lg hover:shadow-accent/10 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3
                            className="text-base sm:text-lg font-bold mb-0.5"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            {item.role}
                          </h3>
                          <p className="text-accent font-medium text-sm flex items-center gap-1 flex-wrap">
                            @{" "}
                            {item.url ? (
                              <Link
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline inline-flex items-center gap-1 text-accent"
                              >
                                {item.organization}
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            ) : (
                              item.organization
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full w-fit shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </div>
                      </div>
                      <p
                        className="text-sm text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>strong]:font-semibold"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </PageLayout>
  );
}
