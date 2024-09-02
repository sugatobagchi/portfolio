"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Github, Linkedin, Twitter, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["About", "Experience", "Skills", "Achievements", "Socials"];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center">
      <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.toLowerCase()}
                  href={`#${item.toLowerCase()}`}
                  className={`transition-colors hover:text-foreground/80 ${
                    activeSection === item.toLowerCase()
                      ? "text-foreground"
                      : "text-foreground/60"
                  }`}
                  onClick={() => setActiveSection(item.toLowerCase())}
                >
                  {item}
                </Link>
              ))}
              <Link
                href="https://sugatobagchi.hashnode.dev/"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Blog
              </Link>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden py-4 px-2 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.toLowerCase()}
                  href={`#${item.toLowerCase()}`}
                  className={`block py-2 px-4 rounded transition-colors hover:bg-accent ${
                    activeSection === item.toLowerCase() ? "bg-accent" : ""
                  }`}
                  onClick={() => {
                    setActiveSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                >
                  {item}
                </Link>
              ))}
              <Link
                href="/blog"
                className="block py-2 px-4 rounded transition-colors hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </nav>
          )}
        </header>

        <main className="py-6 md:py-12">
          <section id="about" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p>
              Hey, I&apos;m <strong>Sugato Bagchi</strong>. I love building
              things, trying out new dishes and talking with new people!
            </p>
          </section>

          <section id="experience" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-xl font-semibold">
                  Backend Developer Intern - Lenspost (now poster)
                </h3>
                <p className="text-muted-foreground">Oct 2023 - May 2024</p>
                <ul className="list-disc list-inside">
                  <li>
                    Enhanced query performance, reducing response time from{" "}
                    <strong>5</strong> seconds to <strong>150</strong>{" "}
                    milliseconds.
                  </li>
                  <li>
                    Implemented caching strategies and optimizations, achieving
                    significant performance improvements for{" "}
                    <strong>15,000+</strong> users worldwide.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="text-xl font-semibold">
                  Summer Intern - Persistent Systems
                </h3>
                <p className="text-muted-foreground">Jun 2023 - Aug 2023</p>
                <ul className="list-disc list-inside">
                  <li>
                    Achieved a perfect score in Online Assessment (OA), ranking
                    among the top 10 out of 1000+ candidates.
                  </li>
                  <li>
                    Sole candidate who cleared the final assessment from
                    college.
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          <section id="volunteer" className="mb-12">
            <h2 className="text-xl font-bold mb-4">Volunteer Contribution</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-xl font-semibold">
                  Google Developers Group Cloud - Kolkata, India
                </h3>
                <p className="text-muted-foreground">Jan 2023 - Present</p>
                <p>
                  Hosted largest DevCon of India with <strong>2800+</strong>{" "}
                  attendees, and <strong>10000+</strong> community members.
                </p>
              </li>
              <li>
                <h3 className="text-xl font-semibold">
                  Lead at Developer Student Clubs SurTech
                </h3>
                <p className="text-muted-foreground">Aug 2023 - Jun 2024</p>
                <p>
                  Conducted online and offline technical training impacting over{" "}
                  <strong>500</strong> students.
                </p>
              </li>
            </ul>
          </section>

          <section id="skills" className="mb-12">
            <div className="container mx-auto max-w-7xl ">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Skills
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="text-lg font-bold">Languages</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Javascript</li>
                    <li>Python</li>
                    <li>Java</li>
                    <li>Go</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="text-lg font-bold">Frameworks</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>Next.js</li>
                    <li>React.js</li>
                    <li>Fast API</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="text-lg font-bold">Databases</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>PostgreSQL</li>
                    <li>MongoDB</li>
                    <li>Firestore</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="text-lg font-bold">Platforms</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Redis</li>
                    <li>Firebase</li>
                    <li>Git</li>
                    <li>Google Cloud Platform</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="achievements" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Achievements</h2>
            <ul className="list-disc list-inside">
              <li>
                Innerve 7.0 2nd runners up in main track. Finalist out of 550+
                teams.
              </li>
              <li>Innerve 7.0 1st prize winner in 5ireChain track.</li>
              <li>
                HackNITR 4.0 1st prize winner in Solana track. Finalist out of
                330+ teams
              </li>
            </ul>
          </section>

          {/* <section id="contact" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
            <form className="space-y-4">
              <Input type="text" placeholder="Name" />
              <Input type="email" placeholder="Email" />
              <Textarea placeholder="Message" />
              <Button type="submit">Send Message</Button>
            </form>
          </section> */}

          <section id="socials" className="mb-12">
            <h2 className="mb-4 text-3xl font-bold">Socials</h2>
            <div className="flex justify-center gap-4">
              <Link
                href="https://github.com/sugatobagchi"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <GithubIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com/in/sugatobagchi"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <LinkedinIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://x.com/sugatobagchi"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com/sugatobagchi"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <InstagramIcon className="h-6 w-6" />
              </Link>
            </div>
          </section>

          <footer className="border-t pt-6">
            <div className="flex justify-between items-center">
              <p>&copy; Sugato Bagchi 2024 </p>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/sugatobagchi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com/in/sugatobagchi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com/sugatobagchi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
