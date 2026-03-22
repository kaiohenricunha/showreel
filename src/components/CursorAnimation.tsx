import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CursorPath } from "../core/types";

const CURSOR_SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="white" stroke="black" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
`;

const cursorDataUri = `data:image/svg+xml,${encodeURIComponent(CURSOR_SVG.trim())}`;

export const CursorAnimation: React.FC<{
  path: CursorPath;
  durationInFrames: number;
}> = ({ path, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { points, clickAt = [] } = path;

  if (points.length === 0) return null;

  // Distribute movement evenly across the duration, leaving 20% padding at start/end
  const moveStart = durationInFrames * 0.1;
  const moveEnd = durationInFrames * 0.9;
  const segments = points.length - 1;

  let x = points[0].x;
  let y = points[0].y;

  if (segments > 0) {
    const progress = interpolate(frame, [moveStart, moveEnd], [0, segments], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    });

    const segIndex = Math.min(Math.floor(progress), segments - 1);
    const segProgress = progress - segIndex;

    const from = points[segIndex];
    const to = points[segIndex + 1];

    x = interpolate(segProgress, [0, 1], [from.x, to.x]);
    y = interpolate(segProgress, [0, 1], [from.y, to.y]);
  }

  // Click ripple: show at click points
  const currentSegment = segments > 0
    ? interpolate(frame, [moveStart, moveEnd], [0, segments], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const activeClick = clickAt.find((ci) => {
    const dist = Math.abs(currentSegment - ci);
    return dist < 0.3;
  });

  const showRipple = activeClick !== undefined;
  const rippleProgress = showRipple
    ? interpolate(
        Math.abs(currentSegment - activeClick!),
        [0, 0.3],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 0;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Ripple */}
      {showRipple && (
        <div
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.6)",
            transform: `translate(-50%, -50%) scale(${1 + rippleProgress * 2})`,
            opacity: 1 - rippleProgress,
          }}
        />
      )}
      {/* Cursor */}
      <img
        src={cursorDataUri}
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: 24,
          height: 24,
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
        }}
      />
    </AbsoluteFill>
  );
};
