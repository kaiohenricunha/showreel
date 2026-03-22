import { DemoScript } from "../core/types";

export const wcRankingsEN: DemoScript = {
  id: "wc-rankings-en",
  title: "2026 World Cup Squad Rankings (EN)",
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
      src: "screenshots/wc-rankings/en/composite-view.png",
      duration: 4,
      caption:
        "Composite rankings blend squad ratings with Kalshi market predictions",
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/en/weight-slider-50.png",
      duration: 4,
      caption: "Adjust the balance between squad talent and market sentiment",
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
      src: "screenshots/wc-rankings/en/spain-expanded.png",
      duration: 5,
      caption:
        "Expand any team — full Starting XI, bench depth, and coach data",
      highlight: { x: 5, y: 30, width: 90, height: 55 },
      transition: "slide-left",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/en/xi-rating-view.png",
      duration: 4,
      caption:
        "Pure Sofascore ratings — who has the strongest Starting XI?",
      transition: "slide-left",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/en/bench-depth.png",
      duration: 4,
      caption:
        "Switch to Bench Depth — tournament squads need more than 11 players",
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/en/france-expanded-bench.png",
      duration: 5,
      caption:
        "France's bench: Olise, Cherki, Rabiot, Konaté — stronger than most starting XIs",
      highlight: { x: 5, y: 45, width: 90, height: 45 },
      transition: "slide-up",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/en/light-mode.png",
      duration: 3,
      caption: "Light and dark themes",
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/en/language-switch.png",
      duration: 3,
      caption: "Available in English, Portuguese, French, and Spanish",
      transition: "fade",
    },
    {
      type: "title",
      duration: 3,
      heading: "github.com/kaiohenricunha/wc-squad-rankings",
      subheading: "Built with React + Vite · Deployed on Vercel",
    },
  ],
};
