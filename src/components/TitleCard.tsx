import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const TitleCard: React.FC<{
  heading: string;
  subheading?: string;
  background?: string;
}> = ({ heading, subheading, background }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 20], [0.95, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          background ?? "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: 64,
            fontWeight: 700,
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1.2,
            marginBottom: subheading ? 24 : 0,
          }}
        >
          {heading}
        </div>
        {subheading && (
          <div
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: 28,
              fontWeight: 400,
              fontFamily: "system-ui, -apple-system, sans-serif",
              lineHeight: 1.4,
            }}
          >
            {subheading}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
