// Centralized content - Single source of truth for site-wide content
// Change values here to update across the entire website

export const siteContent = {
  // Identity
  name: "Sugato Bagchi",
  title: "Software Engineer",
  tagline:
    "Full-Stack Developer passionate about building exceptional digital experiences",
  logo: "<SB />",

  // URLs and Images
  siteUrl: "https://sugatobagchi.com",
  profileImage: "/me.png",
  // Bump when replacing public/me.png so Next.js image cache and CDNs pick up the new file
  profileImageVersion: "2026-07-02",

  seo: {
    title: "Sugato Bagchi | Software Engineer",
    description:
      "Full-Stack Developer passionate about building exceptional digital experiences",
    keywords: [
      "Sugato Bagchi",
      "Software Engineer",
      "Full Stack Developer",
      "Web Developer",
      "React Developer",
      "Frontend Developer",
      "Backend Developer",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Next.js",
      "Portfolio",
      "Web Development",
    ],
  },

  // Theme colors (for OG images, etc.)
  theme: {
    primaryColor: "#3b82f6",
    primaryColorLight: "#60a5fa",
    backgroundColor: "#0d1424",
    textColor: "#ffffff",
    mutedTextColor: "#94a3b8",
  },
};

export const profileImageSrc = `${siteContent.profileImage}?v=${siteContent.profileImageVersion}`;
export const profileImageUrl = `${siteContent.siteUrl}${profileImageSrc}`;

// Re-export existing data for convenience
export * from "@/data/about";
export * from "@/data/socials";
export * from "@/data/skills";
export * from "@/data/experience";
export * from "@/data/projects";
export * from "@/data/achievements";
export * from "@/data/volunteer";
