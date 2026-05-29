"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <PageLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient decorative glowing backdrops */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse [animation-delay:1s]" />

        <div className="max-w-xl w-full text-center relative z-10">
          {/* Animated Glow Circle for 404 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8 flex items-center justify-center"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border border-dashed border-primary/30"
            />
            
            {/* Pulsing ring */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.2)",
                  "0 0 50px rgba(59, 130, 246, 0.4)",
                  "0 0 20px rgba(59, 130, 246, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20"
            />

            <div className="relative flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent select-none font-outfit">
                404
              </span>
              <AlertCircle className="w-5 h-5 text-accent/80 mt-1 animate-bounce" />
            </div>
          </motion.div>

          {/* Texts */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-extrabold mb-4 font-outfit text-foreground tracking-tight"
          >
            Lost in the Digital Void?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-base sm:text-lg mb-8 max-w-md mx-auto"
          >
            The page you are looking for has been moved, removed, or is temporarily under construction.
          </motion.p>

          {/* Countdown & Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 max-w-xs mx-auto p-4 rounded-2xl glass border border-border/30 bg-muted/20"
          >
            <div className="text-xs sm:text-sm text-muted-foreground mb-3 flex items-center justify-center gap-1.5 font-medium">
              <span>Redirecting to home page in</span>
              <motion.span
                key={countdown}
                initial={{ scale: 1.5, color: "var(--color-primary)" }}
                animate={{ scale: 1, color: "var(--color-muted-foreground)" }}
                className="font-bold text-primary text-base inline-block w-5"
              >
                {countdown}
              </motion.span>
              <span>seconds</span>
            </div>

            {/* Simulated countdown bar */}
            <div className="h-1 bg-muted rounded-full overflow-hidden w-full">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
            >
              <Home className="w-4 h-4" />
              <span>Go Home Now</span>
            </Link>

            <button
              onClick={() => router.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted/40 font-semibold transition-all hover:scale-[1.02]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
