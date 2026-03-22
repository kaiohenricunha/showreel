import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const TRANSITION_FRAMES = 15;

export const TransitionWipe: React.FC<{
  type: "fade" | "slide-left" | "slide-up" | "none";
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ type, durationInFrames, children }) => {
  const frame = useCurrentFrame();

  if (type === "none") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }

  if (type === "fade") {
    const opacity = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
      extrapolateRight: "clamp",
    });
    return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
  }

  if (type === "slide-left") {
    const translateX = interpolate(frame, [0, TRANSITION_FRAMES], [100, 0], {
      extrapolateRight: "clamp",
    });
    return (
      <AbsoluteFill style={{ transform: `translateX(${translateX}%)` }}>
        {children}
      </AbsoluteFill>
    );
  }

  if (type === "slide-up") {
    const translateY = interpolate(frame, [0, TRANSITION_FRAMES], [100, 0], {
      extrapolateRight: "clamp",
    });
    return (
      <AbsoluteFill style={{ transform: `translateY(${translateY}%)` }}>
        {children}
      </AbsoluteFill>
    );
  }

  return <AbsoluteFill>{children}</AbsoluteFill>;
};
