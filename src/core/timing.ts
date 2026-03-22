import { Scene } from "./types";

export interface FrameRange {
  from: number;
  durationInFrames: number;
}

export function scenesToFrameRanges(
  scenes: Scene[],
  fps: number,
): FrameRange[] {
  let offset = 0;
  return scenes.map((scene) => {
    const durationInFrames = Math.round(scene.duration * fps);
    const range: FrameRange = { from: offset, durationInFrames };
    offset += durationInFrames;
    return range;
  });
}

export function totalDurationInFrames(scenes: Scene[], fps: number): number {
  return scenes.reduce(
    (sum, scene) => sum + Math.round(scene.duration * fps),
    0,
  );
}
