import { socials } from "@/data/socials";
import Link from "next/link";
import { SiGithub, SiLinkedin, SiX, SiInstagram } from "react-icons/si";

export default function SocialsSection() {
  return (
    <section id="socials" className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient font-montserrat font-mono">
        Socials
      </h2>
      <div className="flex justify-center gap-4 font-inter">
        {socials.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="hover:text-primary text-muted-foreground transition-colors"
          >
            {social.name === "GitHub" && <SiGithub className="w-6 h-6" />}
            {social.name === "LinkedIn" && <SiLinkedin className="w-6 h-6" />}
            {social.name === "X" && <SiX className="w-6 h-6" />}
            {social.name === "Instagram" && <SiInstagram className="w-6 h-6" />}
          </Link>
        ))}
      </div>
    </section>
  );
}
