export interface Feature {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
}

export const features: Feature[] = [
  {
    id: "about",
    label: "About",
    href: "#about",
    enabled: true,
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    enabled: false,
  },
  {
    id: "experience",
    label: "Experience",
    href: "#experience",
    enabled: true,
  },
  {
    id: "volunteer",
    label: "Volunteer",
    href: "#volunteer",
    enabled: true,
  },
  {
    id: "skills",
    label: "Skills",
    href: "#skills",
    enabled: true,
  },
  {
    id: "achievements",
    label: "Achievements",
    href: "#achievements",
    enabled: true,
  },
  {
    id: "socials",
    label: "Socials",
    href: "#socials",
    enabled: true,
  },
];
