import { socials } from "@/data/socials";
import Link from "next/link";
import { SiGithub, SiLinkedin, SiX, SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t pt-6 mt-12 text-center">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto px-4 gap-2 font-inter">
        <p className="text-sm">&copy; Sugato Bagchi 2024</p>
        <div className="flex space-x-4">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="hover:text-primary text-muted-foreground"
            >
              {social.name === "GitHub" && <SiGithub className="w-5 h-5" />}
              {social.name === "LinkedIn" && <SiLinkedin className="w-5 h-5" />}
              {social.name === "X" && <SiX className="w-5 h-5" />}
              {social.name === "Instagram" && (
                <SiInstagram className="w-5 h-5" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
