"use client";

import React, { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Copy, Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/data/blogs";
import SocialIcons from "@/components/SocialIcons";
import A2UIChatWidget from "@/components/agent/A2UIChatWidget";

interface BlogDetailClientProps {
  post: BlogPost | undefined;
}

const parseBoldText = (segment: string) => {
  const parts = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;
  let uniqueKey = 0;

  while ((match = regex.exec(segment)) !== null) {
    const [_, boldContent] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(segment.substring(lastIndex, matchIndex));
    }

    parts.push(
      <strong key={`bold-${matchIndex}-${uniqueKey++}`} className="text-foreground font-semibold">
        {boldContent}
      </strong>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < segment.length) {
    parts.push(segment.substring(lastIndex));
  }

  return parts;
};

const renderParagraphText = (text?: string) => {
  if (!text) return null;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [_, linkText, url] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(...parseBoldText(text.substring(lastIndex, matchIndex)));
    }

    const isExternal = url.startsWith("http");
    if (isExternal) {
      parts.push(
        <a
          key={`link-${matchIndex}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-semibold"
        >
          {linkText}
        </a>
      );
    } else {
      parts.push(
        <Link
          key={`link-${matchIndex}`}
          href={url}
          className="text-primary hover:underline font-semibold"
        >
          {linkText}
        </Link>
      );
    }

    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(...parseBoldText(text.substring(lastIndex)));
  }

  return parts.length > 0 ? parts : text;
};

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const [mounted, setMounted] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    return scrollYProgress.on("change", (v) => setPct(Math.round(v * 100)));
  }, [scrollYProgress, mounted]);

  const totalMinutes = post ? parseInt(post.readTime) || 5 : 5;
  const remainingMinutes = Math.max(0, Math.ceil(totalMinutes * (1 - pct / 100)));

  if (!post) {
    return (
      <PageLayout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-3xl font-bold mb-4 text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            The blog article you are looking for does not exist or has been
            moved.
          </p>
          <Link
            href="/blogs"
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Blogs
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout themeTogglePosition="left">
      <div className="min-h-screen relative">
        {/* Diagonal Ropes Background */}
        <DiagonalRopesBackground />

        <div className="w-full relative z-10">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-24 relative">
            {/* Left vertical progress tracker - desktop only */}
            {mounted && <ProgressBar />}
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="pt-10 mb-10"
            >
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                All posts
              </Link>
            </motion.div>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex items-center gap-5 text-xs text-muted-foreground mb-6"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {pct === 0 ? post.readTime : remainingMinutes === 0 ? "Finished" : `${remainingMinutes} min left`}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-[2.65rem] font-bold text-foreground leading-[1.2] tracking-tight mb-12"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {post.title}
            </motion.h1>

            {/* Cover image — contained, modest size */}
            {post.coverImage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="w-full rounded-2xl overflow-hidden border border-border/60 mb-12 shadow-md"
                style={{ maxHeight: "340px" }}
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  style={{ maxHeight: "340px" }}
                />
              </motion.div>
            )}

            {/* Article body */}
            <motion.article
              ref={articleRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="prose-article"
            >
              {post.content.map((block, idx) => {
                switch (block.type) {
                  case "paragraph":
                    return (
                      <p key={idx}>
                        {renderParagraphText(block.text)}
                      </p>
                    );

                  case "heading":
                    const id = block.text
                      ? block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                      : `h-${idx}`;
                    if (block.level === 3) {
                      return (
                        <h3 key={idx} id={id}>
                          {block.text}
                        </h3>
                      );
                    }
                    return (
                      <h2 key={idx} id={id}>
                        {block.text}
                      </h2>
                    );

                  case "quote":
                    return (
                      <blockquote key={idx}>
                        {block.text}
                      </blockquote>
                    );

                  case "list":
                    return (
                      <ul key={idx}>
                        {block.items?.map((item, itemIdx) => {
                          const match = item.match(/^\*\*(.*?)\*\*:(.*)/);
                          if (match) {
                            return (
                              <li key={itemIdx}>
                                <div>
                                  <strong className="text-foreground font-semibold mr-1">{match[1]}:</strong>
                                  {match[2]}
                                </div>
                              </li>
                            );
                          }
                          return <li key={itemIdx}>{item}</li>;
                        })}
                      </ul>
                    );

                  case "code":
                    return (
                      <CodeBlock
                        key={idx}
                        code={block.code ?? ""}
                        language={block.language ?? "javascript"}
                      />
                    );

                  case "image":
                    return (
                      <div key={idx} className="my-8 flex flex-col items-center">
                        <div className="rounded-xl overflow-hidden border border-border/60 shadow-md max-w-full bg-card/50 p-2">
                          <img
                            src={block.url}
                            alt={block.alt ?? "Blog image"}
                            className="max-h-[400px] object-contain w-auto h-auto mx-auto rounded-lg"
                          />
                        </div>
                        {block.caption && (
                          <span className="text-xs text-muted-foreground mt-2 text-center italic block">
                            {block.caption}
                          </span>
                        )}
                      </div>
                    );

                  case "video":
                    return (
                      <div key={idx} className="my-8 flex flex-col items-center">
                        <div className="rounded-xl overflow-hidden border border-border/60 shadow-md w-full max-w-2xl bg-card/50 p-2">
                          <video
                            src={block.url}
                            controls
                            controlsList="nodownload noplaybackrate"
                            disablePictureInPicture
                            onContextMenu={(e) => e.preventDefault()}
                            playsInline
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        {block.caption && (
                          <span className="text-xs text-muted-foreground mt-2 text-center italic block">
                            {block.caption}
                          </span>
                        )}
                      </div>
                    );

                  case "interactive":
                    if (block.widget === "socials") {
                      return (
                        <div key={idx} className="my-10 flex flex-col items-center justify-center">
                          <SocialIcons variant="footer" className="justify-center gap-6 scale-110" />
                        </div>
                      );
                    }
                    if (block.widget === "chat-prompts") {
                      return (
                        <div key={idx} className="my-8 not-prose">
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                            Try it live — click any prompt below
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {(block.items ?? []).map((prompt) => (
                              <button
                                key={prompt}
                                type="button"
                                onClick={() =>
                                  window.dispatchEvent(
                                    new CustomEvent("a2ui-prompt", { detail: { prompt } })
                                  )
                                }
                                className="group inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/70 px-4 py-2 text-sm font-medium text-primary transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                              >
                                <span className="text-primary/60 group-hover:text-primary transition-colors">▶</span>
                                {prompt}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;

                  default:
                    return null;
                }
              })}
            </motion.article>
          </div>
        </div>
      </div>

      {post?.slug === "a2ui-portfolio-demo" && (
        <A2UIChatWidget />
      )}
    </PageLayout>
  );
}

const DOTS = 8;
const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setPct(Math.round(v * 100)));
  }, [scrollYProgress]);

  const strokeDash = useTransform(
    scrollYProgress,
    [0, 1],
    [CIRCUMFERENCE, 0]
  );

  const activeDots = Math.round((pct / 100) * DOTS);

  return (
    <div className="absolute -left-20 top-0 bottom-0 w-14 hidden lg:block pointer-events-none">
      <div className="sticky top-[30vh] flex flex-col items-center gap-3">
        <div className="relative w-14 h-14">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)/0.25) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div
            className="absolute inset-0 rounded-full border border-border/40"
            style={{
              background: "hsl(var(--card)/0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          />

          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 56 56"
            fill="none"
          >
            <circle
              cx="28"
              cy="28"
              r={RADIUS}
              stroke="hsl(var(--border))"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity={0.5}
            />
            <motion.circle
              cx="28"
              cy="28"
              r={RADIUS}
              stroke="url(#arcGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: strokeDash }}
            />
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[10px] font-bold tabular-nums"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {pct}%
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[5px]">
          {Array.from({ length: DOTS }).map((_, i) => {
            const isActive = i < activeDots;
            const isHead = isActive && i === activeDots - 1;
            return (
              <motion.div
                key={i}
                animate={
                  isHead
                    ? { scale: [1, 1.45, 1], opacity: [0.75, 1, 0.75] }
                    : { scale: 1, opacity: 1 }
                }
                transition={isHead ? { duration: 1.2, repeat: Infinity } : {}}
                style={{
                  width: isHead ? 7 : 5,
                  height: isHead ? 7 : 5,
                  borderRadius: "50%",
                  background: isActive
                    ? `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))`
                    : "hsl(var(--border))",
                  boxShadow: isHead
                    ? "0 0 8px hsl(var(--primary)/0.7), 0 0 16px hsl(var(--accent)/0.4)"
                    : "none",
                  transition: "background 0.3s ease, box-shadow 0.3s ease, width 0.2s, height 0.2s",
                }}
              />
            );
          })}
        </div>

        <span
          className="text-[8px] font-semibold tracking-widest uppercase"
          style={{ color: "hsl(var(--muted-foreground))", writingMode: "vertical-rl", letterSpacing: "0.2em" }}
        >
          read
        </span>
      </div>
    </div>
  );
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = code.trim().split("\n").length;
  const isCollapsible = lineCount > 6;

  const toggleExpanded = () => {
    if (isExpanded) {
      setIsExpanded(false);
      requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = rect.top + scrollTop - 120;

          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });
        }
      });
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div ref={containerRef} className="code-block relative group/code">
      <div className="code-block-header">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="code-copy-btn flex items-center justify-center p-1.5 rounded hover:bg-white/10 transition-colors"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      <motion.div
        animate={{ height: isCollapsible && !isExpanded ? 150 : "auto" }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 28,
          mass: 1,
        }}
        className="relative overflow-hidden"
      >
        <pre className="m-0">
          <code>{code}</code>
        </pre>

        {isCollapsible && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background: "linear-gradient(to top, hsl(222 47% 6%) 15%, transparent 100%)",
            }}
          />
        )}
      </motion.div>

      {isCollapsible && (
        <div className="flex justify-center border-t border-zinc-800/20 bg-zinc-950/10 py-3">
          <motion.button
            onClick={toggleExpanded}
            whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer py-1.5 px-4 rounded-full border border-border/40 hover:border-primary/40 bg-zinc-950/40 shadow-sm"
          >
            <span>{isExpanded ? "Collapse code" : "Expand code"}</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="flex items-center"
            >
              <ChevronDown className="w-3.5 h-3.5 text-primary" />
            </motion.span>
          </motion.button>
        </div>
      )}
    </div>
  );
}

const ROPE_PATH_1 = "M 0 0 C 250 100, 250 400, 500 500 C 750 600, 750 900, 1000 1000";
const ROPE_PATH_2 = "M 1000 0 C 750 100, 750 400, 500 500 C 250 600, 250 900, 0 1000";

const ROPE_PATH_1B = "M 8 0 C 258 100, 258 400, 508 500 C 758 600, 758 900, 1008 1000";
const ROPE_PATH_2B = "M 992 0 C 742 100, 742 400, 492 500 C 242 600, 242 900, -8 1000";

const DiagonalRopesBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 w-full h-full opacity-15 sm:opacity-25 dark:opacity-20 dark:sm:opacity-35">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="rope-grad-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="20%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
            <stop offset="80%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="rope-grad-2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            <stop offset="20%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="80%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
          </linearGradient>

          <filter id="rope-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="ball-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="ball-glow-grad-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ball-glow-grad-2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="60%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path
          d={ROPE_PATH_1}
          fill="none"
          stroke="url(#rope-grad-1)"
          strokeWidth="3.5"
          filter="url(#rope-glow)"
        />
        <path
          d={ROPE_PATH_1B}
          fill="none"
          stroke="url(#rope-grad-1)"
          strokeWidth="1.2"
          opacity="0.5"
        />

        <path
          d={ROPE_PATH_2}
          fill="none"
          stroke="url(#rope-grad-2)"
          strokeWidth="3.5"
          filter="url(#rope-glow)"
        />
        <path
          d={ROPE_PATH_2B}
          fill="none"
          stroke="url(#rope-grad-2)"
          strokeWidth="1.2"
          opacity="0.5"
        />

        <g>
          <circle r="22" fill="url(#ball-glow-grad-1)" opacity="0.85" filter="url(#ball-glow)" />
          <circle r="6" fill="#ffffff" opacity="0.95" />
          <animateMotion
            dur="15s"
            repeatCount="indefinite"
            path={ROPE_PATH_1}
          />
        </g>

        <g>
          <circle r="22" fill="url(#ball-glow-grad-2)" opacity="0.85" filter="url(#ball-glow)" />
          <circle r="6" fill="#ffffff" opacity="0.95" />
          <animateMotion
            dur="18s"
            repeatCount="indefinite"
            path={ROPE_PATH_2}
          />
        </g>
      </svg>
    </div>
  );
};
