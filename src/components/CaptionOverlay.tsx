import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const FADE_FRAMES = 10;

export const CaptionOverlay: React.FC<{
  text: string;
  durationInFrames: number;
}> = ({ text, durationInFrames }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [FADE_FRAMES, FADE_FRAMES * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - FADE_FRAMES * 2, durationInFrames - FADE_FRAMES],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          opacity,
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(8px)",
          padding: "16px 32px",
          marginBottom: 48,
          borderRadius: 12,
          maxWidth: "70%",
          textAlign: "center",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: 500,
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1.4,
          }}
        >
          {text}
        </span>
      </div>
    </AbsoluteFill>
  );
};
