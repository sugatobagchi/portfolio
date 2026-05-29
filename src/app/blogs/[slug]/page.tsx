import React from "react";
import { Metadata } from "next";
import { blogs } from "@/data/blogs";
import BlogDetailClient from "./BlogDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | Sugato Bagchi",
      description: "The requested blog article was not found.",
    };
  }

  const title = post.title;
  const description = post.excerpt;
  const url = `https://sugatobagchi.com/blogs/${slug}`;
  

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Sugato Bagchi",
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: ["Sugato Bagchi"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);

  return <BlogDetailClient post={post} />;
}
