import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { DemoScript, Scene } from "./types";
import { scenesToFrameRanges } from "./timing";
import { BrowserFrame } from "../components/BrowserFrame";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { CursorAnimation } from "../components/CursorAnimation";
import { HighlightBox } from "../components/HighlightBox";
import { TitleCard } from "../components/TitleCard";
import { TransitionWipe } from "../components/TransitionWipe";

function renderScene(scene: Scene, script: DemoScript) {
  if (scene.type === "title") {
    return (
      <TitleCard
        heading={scene.heading}
        subheading={scene.subheading}
        background={scene.background}
      />
    );
  }

  if (scene.type === "split") {
    const durationInFrames = Math.round(scene.duration * script.fps);
    return (
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          background: "#111",
        }}
      >
        <div style={{ flex: 1, padding: 40, display: "flex", flexDirection: "column", gap: 8 }}>
          {scene.labelLeft && (
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 600, textAlign: "center" }}>
              {scene.labelLeft}
            </div>
          )}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img
              src={staticFile(scene.srcLeft)}
              style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 8 }}
            />
          </div>
        </div>
        <div
          style={{ width: 2, background: "rgba(255,255,255,0.2)", alignSelf: "stretch" }}
        />
        <div style={{ flex: 1, padding: 40, display: "flex", flexDirection: "column", gap: 8 }}>
          {scene.labelRight && (
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 600, textAlign: "center" }}>
              {scene.labelRight}
            </div>
          )}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img
              src={staticFile(scene.srcRight)}
              style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 8 }}
            />
          </div>
        </div>
        {scene.caption && (
          <CaptionOverlay text={scene.caption} durationInFrames={durationInFrames} />
        )}
      </AbsoluteFill>
    );
  }

  // screenshot scene
  const durationInFrames = Math.round(scene.duration * script.fps);
  return (
    <AbsoluteFill>
      <BrowserFrame url={script.url}>
        <Img
          src={staticFile(scene.src)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </BrowserFrame>
      {scene.highlight && <HighlightBox region={scene.highlight} />}
      {scene.cursor && (
        <CursorAnimation path={scene.cursor} durationInFrames={durationInFrames} />
      )}
      {scene.caption && (
        <CaptionOverlay text={scene.caption} durationInFrames={durationInFrames} />
      )}
    </AbsoluteFill>
  );
}

export const ScriptRunner: React.FC<{ script: DemoScript }> = ({ script }) => {
  const ranges = scenesToFrameRanges(script.scenes, script.fps);

  return (
    <AbsoluteFill style={{ background: "#111" }}>
      {script.scenes.map((scene, i) => {
        const { from, durationInFrames } = ranges[i];
        const transition =
          scene.type === "screenshot" ? scene.transition : undefined;

        return (
          <Sequence key={i} from={from} durationInFrames={durationInFrames}>
            <TransitionWipe
              type={transition ?? "none"}
              durationInFrames={durationInFrames}
            >
              {renderScene(scene, script)}
            </TransitionWipe>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
