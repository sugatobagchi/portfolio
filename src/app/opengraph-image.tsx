import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Sugato Bagchi | Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0d1424",
        padding: "60px 80px",
      }}
    >
      {/* Left side - Text content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#3b82f6",
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          {"<SB />"}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: 8,
            lineHeight: 1.1,
          }}
        >
          Sugato Bagchi
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 24,
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#94a3b8",
            maxWidth: 500,
            lineHeight: 1.5,
          }}
        >
          Full-Stack Developer passionate about building exceptional digital
          experiences
        </div>
      </div>

      {/* Right side - Profile image */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
          padding: 4,
        }}
      >
        <img
          src="https://sugatobagchi.com/me.png"
          alt="Sugato Bagchi"
          width={312}
          height={312}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>
    </div>,
    {
      ...size,
    },
  );
}
