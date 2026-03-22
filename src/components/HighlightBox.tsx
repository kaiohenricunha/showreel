import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { HighlightRegion } from "../core/types";

export const HighlightBox: React.FC<{ region: HighlightRegion }> = ({
  region,
}) => {
  const frame = useCurrentFrame();
  const color = region.color ?? "#f59e0b";

  // Pulse opacity between 0.4 and 1.0 using sine wave
  const pulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.4, 1],
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: `${region.x}%`,
          top: `${region.y}%`,
          width: `${region.width}%`,
          height: `${region.height}%`,
          border: `3px solid ${color}`,
          borderRadius: 8,
          opacity: pulse,
          boxShadow: `0 0 20px ${color}40`,
        }}
      />
    </AbsoluteFill>
  );
};
