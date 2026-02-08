import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 22,
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundImage: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
          backgroundClip: "text",
          color: "transparent",
          display: "flex",
          whiteSpace: "nowrap",
          ...({
            "-webkit-background-clip": "text",
          } as any),
        }}
      >
        &lt;SB /&gt;
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  );
}
