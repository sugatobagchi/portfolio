"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Feature } from "@/config/features";
import { motion, AnimatePresence } from "framer-motion";
import ContactModal from "./ContactModal";

interface HeaderProps {
  navItems: Feature[];
}

export default function Header({ navItems }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "glass shadow-sm border-b border-border/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {/* Mobile: "SB" in heading font */}
            <span
              className="md:hidden text-gradient font-black text-xl pb-1"
              style={{
                fontFamily: "var(--font-heading)",
                lineHeight: "1.2",
              }}
            >
              SB
            </span>
            {/* Desktop: Full name in Italianno */}
            <span
              className="hidden md:block text-gradient pb-2 px-1 translate-y-[2px]"
              style={{
                fontFamily: "var(--font-signature)",
                fontSize: "2.4rem",
                lineHeight: "1.3",
              }}
            >
              Sugato Bagchi
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isSpecial = item.href === "/top-100";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isSpecial
                      ? "text-primary bg-primary/8 hover:bg-primary/14"
                      : isActive
                      ? "text-foreground bg-muted/60"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {item.label}
                  {isSpecial && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-border/50 glass"
            >
              <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const isSpecial = item.href === "/top-100";
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isSpecial
                          ? "text-primary bg-primary/8"
                          : isActive
                          ? "text-foreground bg-muted/60 font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      }`}
                    >
                      {item.label}
                      {isSpecial && (
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
