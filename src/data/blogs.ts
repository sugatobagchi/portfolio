import { a2uiBlog } from "./blogs/a2ui-portfolio-demo";
import { geminiEmbeddingsBlog } from "./blogs/beyond-text-gemini-embedding-2";
import { webgpuGemmaAgentsBlog } from "./blogs/webgpu-gemma-agents";

export interface BlogBlock {
  type:
    | "paragraph"
    | "heading"
    | "list"
    | "code"
    | "quote"
    | "interactive"
    | "image"
    | "video";
  level?: 1 | 2 | 3;
  text?: string;
  items?: string[];
  code?: string;
  language?: string;
  widget?: string;
  url?: string;
  alt?: string;
  caption?: string;
}

export interface BlogPostLink {
  label: string;
  url: string;
  iconName?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  gradientClass: string;
  coverImage?: string;
  content: BlogBlock[];
  githubUrl?: string;
  liveUrl?: string;
  slidesUrl?: string;
  resources?: BlogPostLink[];
}

export const blogs: BlogPost[] = [
  webgpuGemmaAgentsBlog,
  a2uiBlog,
  geminiEmbeddingsBlog,
];
