import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sugatobagchi.com"),
  title: {
    default: "Sugato Bagchi | Software Engineer",
    template: "%s | Sugato Bagchi",
  },
  description:
    "Software Engineer and Full-Stack Developer passionate about building exceptional digital experiences. Expertise in React, TypeScript, Node.js, and modern web technologies.",
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
    "Portfolio",
  ],
  authors: [{ name: "Sugato Bagchi", url: "https://sugatobagchi.com" }],
  creator: "Sugato Bagchi",
  publisher: "Sugato Bagchi",
  openGraph: {
    title: "Sugato Bagchi | Software Engineer",
    description:
      "Software Engineer and Full-Stack Developer passionate about building exceptional digital experiences",
    url: "https://sugatobagchi.com",
    siteName: "Sugato Bagchi",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sugato Bagchi - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sugato Bagchi | Software Engineer",
    description:
      "Software Engineer and Full-Stack Developer passionate about building exceptional digital experiences",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sugatobagchi.com",
  },
  verification: {
    // Add your Google Search Console verification code here if you have one
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-P93PHQ65" />
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <StructuredData />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
