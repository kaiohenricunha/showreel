import React, { useEffect, useState } from "react";
import { Img, staticFile } from "remotion";

/**
 * Renders a screenshot image. If the file fails to load, shows a
 * dark-gray placeholder with the expected filename so the video
 * still renders and timing/flow can be reviewed.
 */
export const ScreenshotImage: React.FC<{ src: string }> = ({ src }) => {
  const [failed, setFailed] = useState(false);

  // Reset on src change
  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#2a2a2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ color: "#666", fontSize: 20, fontFamily: "monospace" }}>
          Missing screenshot
        </div>
        <div style={{ color: "#555", fontSize: 14, fontFamily: "monospace" }}>
          {src}
        </div>
      </div>
    );
  }

  return (
    <Img
      src={staticFile(src)}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      onError={() => setFailed(true)}
    />
  );
};
