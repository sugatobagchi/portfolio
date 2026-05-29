"use client";

import React, { use, useState, useRef, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Copy, Check } from "lucide-react";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import SocialIcons from "@/components/SocialIcons";

interface PageProps {
  params: Promise<{ slug: string }>;
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

export default function BlogDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const post = blogs.find((b) => b.slug === slug);

  const [mounted, setMounted] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <PageLayout>
      <div className="min-h-screen">
        <div className="w-full relative">
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
              {post.readTime}
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
                  return null;

                default:
                  return null;
              }
            })}
          </motion.article>
        </div>
      </div>
    </div>
  </PageLayout>
  );
}

const DOTS = 8;
const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ProgressBar() {
  // Track the whole-page scroll — 0 at top, 1 at the true bottom of the page.
  const { scrollYProgress } = useScroll();

  const [pct, setPct] = React.useState(0);

  React.useEffect(() => {
    return scrollYProgress.on("change", (v) => setPct(Math.round(v * 100)));
  }, [scrollYProgress]);

  const strokeDash = useTransform(
    scrollYProgress,
    [0, 1],
    [CIRCUMFERENCE, 0],
  );

  const activeDots = Math.round((pct / 100) * DOTS);

  return (
    <div className="absolute -left-20 top-0 bottom-0 w-14 hidden lg:block pointer-events-none">
      <div className="sticky top-[30vh] flex flex-col items-center gap-3">

        {/* Circular arc progress */}
        <div className="relative w-14 h-14">
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)/0.25) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Glass pill background */}
          <div
            className="absolute inset-0 rounded-full border border-border/40"
            style={{
              background: "hsl(var(--card)/0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          />

          {/* SVG arc */}
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 56 56"
            fill="none"
          >
            {/* Track */}
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
            {/* Progress arc */}
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

          {/* Percentage label */}
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

        {/* Segmented dot trail */}
        <div className="flex flex-col items-center gap-[5px]">
          {Array.from({ length: DOTS }).map((_, i) => {
            const isActive = i < activeDots;
            // pulse on the LAST active dot (bottom of the filled section)
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

        {/* "READ" label */}
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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
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
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
