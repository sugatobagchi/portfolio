import { ImageResponse } from "next/og";
import { blogs } from "@/data/blogs";
import { siteContent } from "@/content";

export const runtime = "edge";

export const alt = "Blog Post Preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d1424",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 48,
          fontWeight: "bold",
        }}
      >
        Sugato Bagchi | Blog
      </div>,
      { ...size }
    );
  }

  const avatarUrl = siteContent.profileImageUrl || "https://sugatobagchi.com/me.png";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#080c16", // Ultra-premium deep dark night blue
          backgroundImage: "radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.28) 0%, transparent 65%), radial-gradient(circle at 90% 90%, rgba(139, 92, 246, 0.28) 0%, transparent 65%)",
          padding: "60px 85px", // Reduced padding to maximize internal usable canvas space
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow border ring decoration */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "2px solid rgba(59, 130, 246, 0.22)",
            borderRadius: "28px",
            pointerEvents: "none",
          }}
        />

        {/* Left Side: Dynamic Blog Post Title & Date Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "58%",
            height: "100%",
          }}
        >
          {/* Dynamic Topic / Post Title - Absolutely Massive, Bold & High-Contrast */}
          <div
            style={{
              fontSize: post.title.length > 70 ? "60px" : "72px",
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: 1.22,
              marginBottom: "36px",
              letterSpacing: "-2px",
            }}
          >
            {post.title}
          </div>

          {/* Read Time & Date Details - Enlarged */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              color: "#94a3b8",
              fontSize: "24px",
              fontWeight: "500",
            }}
          >
            <span>{post.date}</span>
            <span style={{ color: "#3b82f6", fontWeight: "bold" }}>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Right Side: Professional Branding / Profile Card - Maximum size & Head Cropped */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "38%",
            height: "100%",
            paddingLeft: "65px",
            borderLeft: "3px solid rgba(59, 130, 246, 0.22)",
          }}
        >
          {/* Circular Frame - Enlarged to a giant 280px */}
          <div
            style={{
              display: "flex",
              width: "280px",
              height: "280px",
              borderRadius: "140px",
              border: "5px solid #3b82f6",
              boxShadow: "0 0 50px rgba(59, 130, 246, 0.55)",
              overflow: "hidden",
              position: "relative",
              marginBottom: "32px",
            }}
          >
            {/* Absolute positioning with explicit crop height - perfectly frames the head */}
            <img
              src={avatarUrl}
              alt="Sugato Bagchi"
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "280px",
                height: "360px", // Scaled to exact portrait bounds to anchor crop to top (face/head)
              }}
            />
          </div>

          {/* Name - Enlarged to a bold, premium 48px */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "8px",
              letterSpacing: "-1px",
            }}
          >
            Sugato Bagchi
          </div>

          {/* Professional Role - Enlarged to 24px */}
          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              marginBottom: "28px",
              fontWeight: "500",
            }}
          >
            Software Engineer
          </div>

          {/* Personal Domain / Brand Link - Enlarged to 20px */}
          <div
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#3b82f6",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            sugatobagchi.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
