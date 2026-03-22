import React from "react";
import { Composition } from "remotion";
import { ScriptRunner } from "./core/ScriptRunner";
import { totalDurationInFrames } from "./core/timing";
import { wcRankingsDemo } from "./scripts/wc-rankings";

// Add more script imports here
const allScripts = [wcRankingsDemo];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {allScripts.map((script) => (
        <Composition
          key={script.id}
          id={script.id}
          component={() => <ScriptRunner script={script} />}
          durationInFrames={totalDurationInFrames(script.scenes, script.fps)}
          fps={script.fps}
          width={script.width}
          height={script.height}
        />
      ))}
    </>
  );
};
