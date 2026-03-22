export interface DemoScript {
  id: string;
  title: string;
  tagline?: string;
  url?: string;
  fps: number;
  width: number;
  height: number;
  scenes: Scene[];
}

export type Scene = ScreenshotScene | TitleScene | SplitScene;

export interface ScreenshotScene {
  type: "screenshot";
  src: string;
  duration: number;
  caption?: string;
  highlight?: HighlightRegion;
  cursor?: CursorPath;
  zoom?: ZoomRegion;
  transition?: "fade" | "slide-left" | "slide-up" | "none";
}

export interface TitleScene {
  type: "title";
  duration: number;
  heading: string;
  subheading?: string;
  background?: string;
}

export interface SplitScene {
  type: "split";
  srcLeft: string;
  srcRight: string;
  duration: number;
  caption?: string;
  labelLeft?: string;
  labelRight?: string;
}

export interface HighlightRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

export interface CursorPath {
  points: Array<{ x: number; y: number }>;
  clickAt?: number[];
}

export interface ZoomRegion {
  x: number;
  y: number;
  scale: number;
}
