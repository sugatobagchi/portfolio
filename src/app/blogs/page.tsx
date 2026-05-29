import React from "react";
import { Metadata } from "next";
import { blogs } from "@/data/blogs";
import BlogsPageClient from "./BlogsPageClient";

export const metadata: Metadata = {
  title: "Blogs | Sugato Bagchi",
  description: "Writings on software engineering, web development, artificial intelligence, and personal projects.",
  alternates: {
    canonical: "https://sugatobagchi.com/blogs",
  },
  openGraph: {
    title: "Blogs | Sugato Bagchi",
    description: "Writings on software engineering, web development, artificial intelligence, and personal projects.",
    url: "https://sugatobagchi.com/blogs",
    type: "website",
    siteName: "Sugato Bagchi",
    locale: "en_US",
    images: [
      {
        url: "https://sugatobagchi.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sugato Bagchi Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Sugato Bagchi",
    description: "Writings on software engineering, web development, artificial intelligence, and personal projects.",
    images: ["https://sugatobagchi.com/opengraph-image.png"],
  },
};

export default function BlogsPage() {
  return <BlogsPageClient posts={blogs} />;
}
