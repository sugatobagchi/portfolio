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
    href: "/about",
    enabled: true,
  },
  {
    id: "experience",
    label: "Experience",
    href: "/experience",
    enabled: true,
  },
  {
    id: "top-100",
    label: "Top-100",
    href: "/top-100",
    enabled: true,
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    enabled: true,
  },
  {
    id: "blogs",
    label: "Blogs",
    href: "/blogs",
    enabled: true,
  },
];
