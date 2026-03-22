import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const CHROME_HEIGHT = 52;

const trafficLight = (color: string) => (
  <div
    style={{
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: color,
    }}
  />
);

export const BrowserFrame: React.FC<{
  url?: string;
  children: React.ReactNode;
}> = ({ url, children }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 15], [0.98, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        padding: 32,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "stretch",
      }}
    >
      <div
        style={{
          flex: 1,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          background: "#1a1a1a",
        }}
      >
        {/* Chrome bar */}
        <div
          style={{
            height: CHROME_HEIGHT,
            background: "#2d2d2d",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: 8, marginRight: 12 }}>
            {trafficLight("#ff5f57")}
            {trafficLight("#febc2e")}
            {trafficLight("#28c840")}
          </div>
          <div
            style={{
              flex: 1,
              background: "#1a1a1a",
              borderRadius: 6,
              padding: "6px 14px",
              fontSize: 13,
              color: "#999",
              fontFamily: "system-ui, sans-serif",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {url ?? "localhost:3000"}
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            opacity,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
