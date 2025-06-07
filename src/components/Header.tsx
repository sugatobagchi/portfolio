import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { Feature } from "@/config/features";

interface HeaderProps {
  navItems: Feature[];
  onThemeToggle: () => void;
  theme: string;
}

export default function Header({
  navItems,
  onThemeToggle,
  theme,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between max-w-5xl mx-auto px-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">{"{SB}"}</span>
        </div>
        <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            onClick={onThemeToggle}
            className="w-10 h-10"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden w-10 h-10"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden py-4 px-2 space-y-2 bg-background border-t">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 px-4 rounded transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
