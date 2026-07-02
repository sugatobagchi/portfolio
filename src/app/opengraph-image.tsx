import { ImageResponse } from "next/og";
import { profileImageUrl, siteContent } from "@/content";

export const runtime = "edge";

export const alt = siteContent.seo.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const { name, theme } = siteContent;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.backgroundColor,
      }}
    >
      {/* Centered Photo */}
      <img
        src={profileImageUrl}
        alt={name}
        style={{
          height: 600,
          borderRadius: 32,
          objectFit: "contain",
        }}
      />
    </div>,
    {
      ...size,
    },
  );
}
