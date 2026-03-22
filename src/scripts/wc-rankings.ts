import { DemoScript } from "../core/types";

export const wcRankingsDemo: DemoScript = {
  id: "wc-rankings-demo",
  title: "2026 World Cup Squad Rankings",
  tagline: "Sofascore ratings meet Kalshi prediction markets",
  url: "https://wc-squad-rankings.vercel.app",
  fps: 30,
  width: 1920,
  height: 1080,
  scenes: [
    {
      type: "title",
      duration: 3,
      heading: "⚽ 2026 World Cup Squad Rankings",
      subheading: "12 squads · 198 players · Sofascore + Kalshi",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/composite-view.png",
      duration: 4,
      caption: "Composite rankings blend squad ratings with market predictions",
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/spain-expanded.png",
      duration: 5,
      caption: "Expand any team for full Starting XI and bench breakdown",
      highlight: { x: 5, y: 35, width: 90, height: 50 },
      transition: "slide-left",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/weight-slider.png",
      duration: 4,
      caption: "Adjust the balance between squad ratings and market odds",
      cursor: {
        points: [
          { x: 30, y: 22 },
          { x: 70, y: 22 },
        ],
        clickAt: [0],
      },
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/bench-depth.png",
      duration: 4,
      caption: "France's bench depth is the strongest in the tournament",
      transition: "slide-up",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/coach-details.png",
      duration: 4,
      caption:
        "Coach performance data: win rates, tiers, and tournament pedigree",
      transition: "fade",
    },
    {
      type: "title",
      duration: 3,
      heading: "Built with React + Vite",
      subheading: "github.com/kaiohenricunha/wc-squad-rankings",
    },
  ],
};
