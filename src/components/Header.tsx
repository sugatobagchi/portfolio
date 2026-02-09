"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Feature } from "@/config/features";
import { motion, AnimatePresence } from "framer-motion";
import ContactModal from "./ContactModal";
import { siteContent } from "@/content";

interface HeaderProps {
  navItems: Feature[];
}

export default function Header({ navItems }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between max-w-6xl mx-auto">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-gradient"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {siteContent.logo}
            </motion.span>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    item.href === "/top-100"
                      ? "text-primary bg-primary/10 border border-primary/20 rounded-full hover:bg-primary/20 hover:border-primary/40"
                      : pathname === item.href
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground animated-underline"
                  }`}
                >
                  {item.label}
                  {item.href === "/top-100" && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
                  )}
                  {pathname === item.href && item.href !== "/top-100" && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              </motion.div>
            ))}
            {/* Top-100 Item: Removed to use navItems standard rendering */}
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center gap-3">
            {/* Let's Talk Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              onClick={() => setIsContactOpen(true)}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Let&apos;s Talk
            </motion.button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-10 h-10"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass border-t border-border/50 overflow-hidden"
            >
              <div className="py-4 px-6 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`block py-3 px-4 rounded-lg transition-all ${
                        item.href === "/top-100"
                          ? "text-primary bg-primary/10 border border-primary/20 font-medium"
                          : pathname === item.href
                            ? "text-foreground bg-muted/80 font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                      {item.href === "/top-100" && (
                        <span className="inline-block ml-2 w-2 h-2 bg-accent rounded-full animate-pulse" />
                      )}
                    </Link>
                  </motion.div>
                ))}
                {/* Mobile Item Removed */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
                >
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsContactOpen(true);
                    }}
                    className="w-full mt-2 py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium flex items-center gap-2 justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Let&apos;s Talk
                  </button>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
