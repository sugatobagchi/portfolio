"use client";

import SocialIcons from "./SocialIcons";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Code2, Zap, Coffee, Rocket } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroProps {
  name: string;
  tagline: string;
  avatarUrl: string;
}

const floatingCards = [
  { label: "Software Engineer", icon: Code2, delay: 0.4, position: "right" },
  { label: "Full-Stack Dev", icon: Rocket, delay: 0.6, position: "right" },
  { label: "Foodie & Explorer", icon: Coffee, delay: 0.5, position: "left" },
];

const roles = ["Software Engineer", "Full-Stack Developer", "Traveller"];

export default function Hero({ name, tagline, avatarUrl }: HeroProps) {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transforms
  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);
  const orbX = useTransform(springX, [-300, 300], [-20, 20]);
  const orbY = useTransform(springY, [-300, 300], [-20, 20]);

  // Typewriter effect
  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <section
      className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden py-8 md:py-12"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main gradient orb with parallax */}
        <motion.div
          style={{ x: orbX, y: orbY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

        {/* Floating particles with different shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 2 === 0 ? "rounded-full" : "rotate-45"}`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 18}%`,
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              backgroundColor:
                i % 3 === 0
                  ? "rgba(59, 130, 246, 0.3)"
                  : i % 3 === 1
                    ? "rgba(139, 92, 246, 0.3)"
                    : "rgba(236, 72, 153, 0.2)",
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.2, 0.8, 0.2],
              rotate: i % 2 === 0 ? [0, 360] : [45, 405],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Shooting stars */}
        <motion.div
          className="absolute w-20 h-[1px] bg-gradient-to-r from-primary via-primary to-transparent"
          initial={{ x: -100, y: 100, opacity: 0 }}
          animate={{
            x: ["-10%", "120%"],
            y: ["10%", "40%"],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
        />
        <motion.div
          className="absolute w-16 h-[1px] bg-gradient-to-r from-accent via-accent to-transparent"
          initial={{ x: -100, y: 200, opacity: 0 }}
          animate={{
            x: ["-5%", "110%"],
            y: ["30%", "55%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 8,
            delay: 3,
          }}
        />
      </div>

      <div className="w-full grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="order-2 lg:order-1 text-center lg:text-left pl-2"
        >
          {/* Greeting with hand wave */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-sm font-medium mb-4 border border-primary/20 cursor-default"
          >
            <motion.span
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xl">👋</span>
            </motion.span>
            <span>Hello, I&apos;m</span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>

          {/* Animated name with 3D effect */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <motion.span
              className="block text-foreground relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{
                x: 10,
              }}
            >
              {firstName.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  whileHover={{
                    y: -8,
                    color: "hsl(var(--primary))",
                    transition: { duration: 0.1 },
                  }}
                  className="inline-block cursor-default"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            {lastName && (
              <motion.span
                className="block text-gradient relative pb-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{
                  x: 10,
                }}
              >
                {lastName.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    whileHover={{
                      y: -8,
                      color: "hsl(var(--foreground))",
                      ...({
                        WebkitTextFillColor: "hsl(var(--foreground))",
                      } as any),
                      transition: { duration: 0.05 },
                    }}
                    className="inline-block cursor-default"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
            )}
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="h-8 mb-4 flex items-center justify-center lg:justify-start"
          >
            <span className="text-lg md:text-xl text-primary font-medium">
              {displayText}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-1 w-0.5 h-6 bg-primary inline-block"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed mb-6 md:mb-8"
          >
            {tagline}
          </motion.p>

          {/* Email badge with animated border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-6 flex justify-center lg:justify-start"
          >
            <motion.a
              href="mailto:sugato.bagchi.of@gmail.com"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted/50 text-sm text-muted-foreground overflow-hidden cursor-pointer"
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[1px] rounded-full bg-muted/90 group-hover:bg-card transition-colors" />
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10"
              >
                <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
              </motion.span>
              <span className="relative z-10 group-hover:text-primary transition-colors">
                sugato.bagchi.of@gmail.com
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links with reusable component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex justify-center lg:justify-start"
          >
            <SocialIcons variant="hero" />
          </motion.div>
        </motion.div>

        {/* Right side - Image and floating cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative order-1 lg:order-2 flex justify-center"
        >
          {/* Main container - holds everything */}
          <motion.div
            className="relative w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-[26rem] lg:w-96 lg:h-[30rem]"
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
          >
            {/* Circle container - positioned at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] aspect-square">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-primary/40 to-accent/40 rounded-full blur-2xl scale-110"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1.1, 1.2, 1.1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Solid circle background */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 via-card to-accent/15 border-2 border-primary/20 shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 60px rgba(59, 130, 246, 0.1)",
                    "0 0 60px rgba(59, 130, 246, 0.4), inset 0 0 80px rgba(59, 130, 246, 0.15)",
                    "0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 60px rgba(59, 130, 246, 0.1)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Rotating rings around circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 scale-[1.15]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-accent/25 scale-[1.25]"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-primary/15 scale-[1.35]"
              />

              {/* Orbiting dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 scale-[1.2]"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/50" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 scale-[1.3]"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50" />
              </motion.div>
            </div>

            {/* Profile image - ON TOP, extending above circle */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="absolute inset-0 z-10"
            >
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className={`object-contain object-bottom drop-shadow-2xl transition-all duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                priority
                onLoad={() => setImageLoaded(true)}
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))",
                  maskImage:
                    "linear-gradient(to bottom, black 80%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 80%, transparent 100%)",
                }}
              />
            </motion.div>

            {/* Floating cards with icons */}
            {floatingCards.map((card, index) => {
              const Icon = card.icon;
              const rightPositions = [
                "top-4 -right-4 md:top-8 md:-right-16",
                "bottom-12 -right-4 md:bottom-20 md:-right-16",
              ];
              const leftPositions = [
                "top-1/2 -translate-y-1/2 -left-4 md:-left-20",
              ];

              const rightIndex = floatingCards
                .filter((c) => c.position === "right")
                .indexOf(card);
              const leftIndex = floatingCards
                .filter((c) => c.position === "left")
                .indexOf(card);

              const positionClass =
                card.position === "right"
                  ? rightPositions[rightIndex] || rightPositions[0]
                  : leftPositions[leftIndex] || leftPositions[0];

              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: card.delay }}
                  className={`absolute hidden md:block z-20 ${positionClass}`}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
                    }}
                    className="flex items-center gap-3 px-4 py-3 bg-card/95 backdrop-blur-md rounded-2xl shadow-xl border border-border/50 cursor-default group hover:border-primary/50 transition-colors"
                  >
                    <motion.div
                      className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-4 h-4 text-primary" />
                    </motion.div>
                    <span className="text-sm font-medium whitespace-nowrap">
                      {card.label}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Decorative elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-8 w-6 h-6 border-2 border-primary/40 rounded-lg"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                x: [0, 10, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-24 -left-12 w-4 h-4 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur-[2px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 right-1/3 w-3 h-3 bg-accent/50 rounded-full"
            />

            {/* Zap icon floating */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [-10, 10, -10],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -right-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - Removed */}
    </section>
  );
}
