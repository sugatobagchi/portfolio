"use client";

import { socials } from "@/data/socials";
import Link from "next/link";
import { SiGithub, SiX, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail, User, MessageSquare, Sparkles } from "lucide-react";
import { useState } from "react";

const socialIconMap: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }
> = {
  GitHub: { icon: SiGithub, color: "hover:bg-[#333] hover:text-white" },
  LinkedIn: { icon: FaLinkedin, color: "hover:bg-[#0A66C2] hover:text-white" },
  X: {
    icon: SiX,
    color:
      "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
  },
  Instagram: {
    icon: SiInstagram,
    color:
      "hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:text-white",
  },
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="fixed inset-x-4 top-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header with illustration */}
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-6 pb-8">
                {/* Decorative elements */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-4 right-16 w-3 h-3 bg-primary/30 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute top-8 right-8 w-2 h-2 bg-accent/40 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-4 left-8 w-2 h-2 bg-primary/20 rounded-full"
                />

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MessageSquare className="w-7 h-7 text-primary" />
                      </motion.div>
                    </motion.div>
                    <div>
                      <h2
                        className="text-2xl font-bold"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        Let&apos;s Talk
                      </h2>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        I&apos;d love to hear from you!
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-card/80 flex items-center justify-center hover:bg-card transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Social Links */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with me on social media
                  </p>
                  <div className="flex gap-3">
                    {socials.map((social, index) => {
                      const config = socialIconMap[social.name];
                      if (!config) return null;
                      const Icon = config.icon;

                      return (
                        <motion.div
                          key={social.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                          >
                            <motion.div
                              whileHover={{ scale: 1.15, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center transition-all ${config.color}`}
                            >
                              <Icon className="w-5 h-5" />
                            </motion.div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    or send a message
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                    <textarea
                      placeholder="Your message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
                  >
                    {submitted ? (
                      <>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          ✓
                        </motion.span>
                        Message Sent!
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
