"use client";

import React from "react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogs } from "@/data/blogs";

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
          {/* Gradients for Rope 1 (Indigo to Cyan) */}
          <linearGradient id="rope-grad-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="20%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
            <stop offset="80%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>

          {/* Gradients for Rope 2 (Teal to Blue) */}
          <linearGradient id="rope-grad-2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            <stop offset="20%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="80%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
          </linearGradient>

          {/* Glow filter for ropes */}
          <filter id="rope-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glow filter for balls */}
          <filter id="ball-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ball 1 Radial Gradient (Cyan/Blue core) */}
          <radialGradient id="ball-glow-grad-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>

          {/* Ball 2 Radial Gradient (Purple/Indigo core) */}
          <radialGradient id="ball-glow-grad-2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="60%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Rope 1: Top-Left to Bottom-Right */}
        <path
          d={ROPE_PATH_1}
          fill="none"
          stroke="url(#rope-grad-1)"
          strokeWidth="3.5"
          filter="url(#rope-glow)"
        />
        {/* Rope 1 secondary line for 3D look */}
        <path
          d={ROPE_PATH_1B}
          fill="none"
          stroke="url(#rope-grad-1)"
          strokeWidth="1.2"
          opacity="0.5"
        />

        {/* Rope 2: Top-Right to Bottom-Left */}
        <path
          d={ROPE_PATH_2}
          fill="none"
          stroke="url(#rope-grad-2)"
          strokeWidth="3.5"
          filter="url(#rope-glow)"
        />
        {/* Rope 2 secondary line for 3D look */}
        <path
          d={ROPE_PATH_2B}
          fill="none"
          stroke="url(#rope-grad-2)"
          strokeWidth="1.2"
          opacity="0.5"
        />

        {/* Glowing Ball 1 traveling on Rope 1 */}
        <g>
          {/* Soft outer glow */}
          <circle r="22" fill="url(#ball-glow-grad-1)" opacity="0.85" filter="url(#ball-glow)" />
          {/* Extra bright core */}
          <circle r="6" fill="#ffffff" opacity="0.95" />
          <animateMotion
            dur="15s"
            repeatCount="indefinite"
            path={ROPE_PATH_1}
          />
        </g>

        {/* Glowing Ball 2 traveling on Rope 2 */}
        <g>
          {/* Soft outer glow */}
          <circle r="22" fill="url(#ball-glow-grad-2)" opacity="0.85" filter="url(#ball-glow)" />
          {/* Extra bright core */}
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

export default function BlogsPage() {
  return (
    <PageLayout>
      <div className="relative min-h-screen py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
        {/* Diagonal Ropes Background */}
        <DiagonalRopesBackground />

        <div className="relative max-w-4xl mx-auto z-10">

          {/* Page Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-6xl font-black mb-12 tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Blogs
          </motion.h1>

          {/* Blog List */}
          <div className="flex flex-col gap-6">
            {blogs.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <Link href={`/blogs/${post.slug}`} className="group block">
                  <div className="flex flex-col rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">

                    {/* Text content */}
                    <div className="flex flex-col justify-between p-5 sm:p-6 flex-1">
                      <div>
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2 line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Read
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
