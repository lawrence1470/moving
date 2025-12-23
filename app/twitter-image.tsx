import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Walk-up Pros - Evening Movers Manhattan";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          backgroundImage: "linear-gradient(135deg, #000 0%, #18181b 100%)",
        }}
      >
        {/* Yellow accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#FACC15",
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "120px",
            backgroundColor: "#FACC15",
            borderRadius: "16px",
            marginBottom: "40px",
            border: "4px solid #000",
            boxShadow: "8px 8px 0px 0px #000",
          }}
        >
          <svg
            width="70"
            height="70"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#000"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 24 L8 18 L13 18 L13 12 L18 12 L18 6 L24 6 L24 24" />
          </svg>
        </div>

        {/* Company name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-2px",
            marginBottom: "16px",
          }}
        >
          Walk-up Pros
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#FACC15",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          Evening Movers Manhattan
        </div>

        {/* Details */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            fontSize: 24,
            color: "#a1a1aa",
          }}
        >
          <span>M-F 5PM-1AM</span>
          <span>•</span>
          <span>Weekends 6AM-1AM</span>
          <span>•</span>
          <span>(347) 617-2607</span>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: 20,
            color: "#52525b",
          }}
        >
          walkuppros.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
