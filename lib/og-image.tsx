import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f4f4f0",
          color: "#050505",
        }}
      >
        <div
          style={{
            fontSize: 160,
            fontWeight: 900,
            letterSpacing: -6,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          CAFE DEPO
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          NÁDRAŽNÍ 1118 /// TURNOV
        </div>
        <div
          style={{
            marginTop: 44,
            width: 340,
            height: 6,
            background: "#c81414",
          }}
        />
      </div>
    ),
    { ...OG_SIZE },
  );
}
