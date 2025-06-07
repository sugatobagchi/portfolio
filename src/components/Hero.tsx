import { socials } from "@/data/socials";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

interface HeroProps {
  name: string;
  tagline: string;
  avatarUrl: string;
}

export default function Hero({ name, tagline, avatarUrl }: HeroProps) {
  const { theme } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center text-center py-12 gap-4">
      <div className="relative w-28 h-28 mb-2">
        <Image
          src={avatarUrl}
          alt={name}
          fill
          className={`rounded-full border-4 object-cover ${
            theme === "dark" ? "border-primary" : "border-black"
          }`}
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient font-montserrat">
        {name}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-4 font-inter font-light">
        {tagline}
      </p>
      <div className="flex gap-3 justify-center">
        {socials.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="hover:text-primary text-muted-foreground"
          >
            {/* Replace with icon component logic */}
            <span className="sr-only">{social.name}</span>
            <i className={`icon-${social.icon} w-6 h-6`}></i>
          </Link>
        ))}
      </div>
    </section>
  );
}
