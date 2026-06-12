export interface Feature {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
}

export const features: Feature[] = [
  {
    id: "about",
    label: "About Me",
    href: "/about",
    enabled: true,
  },
  {
    id: "blogs",
    label: "Blogs",
    href: "/blogs",
    enabled: true,
  },
];

