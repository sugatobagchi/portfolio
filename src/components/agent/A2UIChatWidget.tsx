"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Maximize2, Minimize2, Send, X } from "lucide-react";
import { portfolioCatalog } from "@/components/agent/UICatalog";

const SUGGESTED_PROMPTS = [
  "Show me your career timeline",
  "Where are you based?",
  "What's your tech stack?",
];

const MAX_PROMPT_LENGTH = 500;

type A2UIData = {
  component: "TimelineCard" | "SkillGrid" | "None" | string;
  props: Record<string, unknown>;
};

type ChatMessage = {
  role: "user" | "agent";
  content: string;
  a2ui?: A2UIData;
};

export default function A2UIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFabHovered, setIsFabHovered] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "agent",
      content: "Hi! Ask me about Sugato's work experience or tech stack.",
      a2ui: { component: "None", props: {} },
    },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastUserMsgRef = useRef<HTMLDivElement>(null);
  const canSubmit = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  // Listen for prompt clicks dispatched from within the blog article body.
  useEffect(() => {
    const handler = (e: Event) => {
      const prompt = (e as CustomEvent<{ prompt: string }>).detail?.prompt;
      if (!prompt) return;
      setIsOpen(true);
      void handleSendMessage(prompt);
    };
    window.addEventListener("a2ui-prompt", handler);
    return () => window.removeEventListener("a2ui-prompt", handler);
  // handleSendMessage is stable per render; listing it would cause re-subscription loops.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll so the last user message sits near the top of the container,
  // giving a chat-style view where you see question + start of answer.
  useEffect(() => {
    const container = scrollContainerRef.current;
    const userEl = lastUserMsgRef.current;
    if (!container || !userEl) return;
    requestAnimationFrame(() => {
      if (!container || !userEl) return;
      const top = userEl.offsetTop - container.offsetTop - 8;
      container.scrollTo({ top, behavior: "smooth" });
    });
  }, [messages, isLoading]);

  const handleSendMessage = async (messageText: string) => {
    const prompt = messageText.trim();
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (response.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            content: "You're sending messages too quickly. Please wait a minute and try again.",
            a2ui: { component: "None", props: {} },
          },
        ]);
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error("Failed to stream response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      const parsed = JSON.parse(fullText) as {
        message?: string;
        a2ui?: A2UIData;
      };

      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: parsed.message ?? "I could not generate a response.",
          a2ui: parsed.a2ui ?? { component: "None", props: {} },
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: "Sorry, I hit an error. Please try again.",
          a2ui: { component: "None", props: {} },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    const currentInput = input;
    setInput("");
    await handleSendMessage(currentInput);
  };

  const widgetWidth = isExpanded ? "w-[520px]" : "w-[360px]";
  const messageAreaHeight = isExpanded ? "h-[460px]" : "h-80";

  // Index of the most recent user message (for scroll anchor)
  const lastUserIdx = messages.reduce((acc, m, i) => (m.role === "user" ? i : acc), -1);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-8 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-open"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            layout
            className={`${widgetWidth} max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-card/95 backdrop-blur-sm shadow-2xl overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div>
                <p className="text-sm font-semibold text-foreground">Portfolio Agent</p>
                <p className="text-xs text-muted-foreground">Native A2UI Chat</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsExpanded((v) => !v)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
                >
                  {isExpanded
                    ? <Minimize2 className="w-3.5 h-3.5" />
                    : <Maximize2 className="w-3.5 h-3.5" />
                  }
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollContainerRef}
              className={`${messageAreaHeight} overflow-y-auto px-3 py-3 space-y-3`}
            >
              {messages.map((message, index) => {
                const isAgent = message.role === "agent";
                const isLastUser = message.role === "user" && index === lastUserIdx;
                const componentKey = message.a2ui?.component as keyof typeof portfolioCatalog | undefined;
                const Component = componentKey ? portfolioCatalog[componentKey] : undefined;

                return (
                  <div
                    key={`${message.role}-${index}`}
                    ref={isLastUser ? lastUserMsgRef : null}
                    className="space-y-2"
                  >
                    <div
                      className={`rounded-xl px-3 py-2 text-sm leading-relaxed ${
                        isAgent
                          ? "bg-muted text-foreground border border-border"
                          : "ml-6 bg-emerald-600 text-white border border-emerald-700/40 shadow-sm dark:bg-emerald-500/25 dark:text-emerald-50 dark:border-emerald-500/40"
                      }`}
                    >
                      {message.content}
                    </div>

                    {isAgent && Component && message.a2ui?.component !== "None" ? (
                      <div className="ml-1">
                        <Component {...(message.a2ui?.props ?? {})} />
                      </div>
                    ) : null}
                  </div>
                );
              })}

              {isLoading ? (
                <div className="flex items-center gap-2 px-1">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-xs text-muted-foreground"
                  >
                    Thinking
                  </motion.span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                        className="w-1 h-1 rounded-full bg-muted-foreground/50 inline-block"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Suggested prompts */}
            <div className="px-3 pt-3 border-t border-border">
              <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void handleSendMessage(prompt)}
                    disabled={isLoading}
                    className="whitespace-nowrap rounded-full bg-muted hover:bg-secondary border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about experience or skills..."
                maxLength={MAX_PROMPT_LENGTH}
                className="flex-1 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm px-3 py-2 outline-none focus:border-primary/60"
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className="p-2 rounded-xl bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        ) : (
          <div key="chat-closed" className="relative flex items-center justify-center">
            <AnimatePresence>
              {isFabHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-[calc(100%+10px)] right-0 pointer-events-none"
                >
                  <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-xl">
                    <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                      Try the A2UI demo
                    </p>
                    <p className="text-[10px] text-muted-foreground whitespace-nowrap mt-0.5">
                      Ask about experience, skills, or location
                    </p>
                  </div>
                  <div className="absolute -bottom-1 right-5 w-2 h-2 rotate-45 border-r border-b border-border bg-card" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ambient pulse rings */}
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-emerald-500/25"
              animate={{ scale: [1, 1.55, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-emerald-400/15"
              animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0.08, 0.35] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />

            <motion.button
              initial={{ opacity: 0, scale: 0.6, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 12 }}
              transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.35 }}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onHoverStart={() => setIsFabHovered(true)}
              onHoverEnd={() => setIsFabHovered(false)}
              onFocus={() => setIsFabHovered(true)}
              onBlur={() => setIsFabHovered(false)}
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 rounded-full bg-linear-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-900/30 hover:shadow-emerald-600/40 flex items-center justify-center border border-emerald-400/30"
              aria-label="Open A2UI chat demo"
              title="Try the A2UI demo"
            >
              <motion.span
                aria-hidden
                className="absolute inset-1 rounded-full bg-white/10"
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.span
                className="relative flex items-center justify-center"
                animate={{ rotate: [0, -6, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Bot className="w-6 h-6" strokeWidth={2.25} />
              </motion.span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
