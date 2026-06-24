import React from "react";
import { Composition } from "remotion";
import { ScriptRunner } from "./core/ScriptRunner";
import { totalDurationInFrames } from "./core/timing";
import { wcRankingsEN } from "./scripts/wc-rankings-en";
import { wcRankingsPT } from "./scripts/wc-rankings-pt";
import { wcPoolEN } from "./scripts/wc-pool-en";
import { wcPoolPT } from "./scripts/wc-pool-pt";

const allScripts = [wcRankingsEN, wcRankingsPT, wcPoolEN, wcPoolPT];

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
