import { DemoScript } from "../core/types";

// Demo prediction pool walkthrough (EN). Screenshots come from
// `node scripts/capture.mjs pool en` against /pool/demo. Captions follow the
// SquadRanks analyst voice: specific, data-led, no em dashes, no filler.
// No highlight regions: the screenshots are 1920x1080 viewport crops shown
// inside a padded browser frame with objectFit cover, so percentage overlays
// do not map cleanly. The captions carry the focus instead.
export const wcPoolEN: DemoScript = {
  id: "wc-pool-en",
  title: "Prediction Pool — World Cup 2026 (EN)",
  tagline: "Run a World Cup pool with friends, free and non-custodial",
  url: "https://www.squadranks.com/pool/demo",
  fps: 30,
  width: 1920,
  height: 1080,
  scenes: [
    {
      type: "title",
      duration: 3,
      heading: "🏆 SquadRanks Prediction Pools",
      subheading: "One pick per match. A live table. No money held.",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/en/pool-predictions.png",
      duration: 5,
      caption:
        "One pick per match. Exact scores pay 10, the result pays 5.",
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/en/pool-members.png",
      duration: 4,
      caption: "Join by code, link, or QR. 17 players in, 13 seats open.",
      transition: "slide-left",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/en/pool-leaderboard.png",
      duration: 6,
      caption:
        "A live table ranks the pool. Bruno leads on 80, and it runs to the final whistle.",
      transition: "slide-left",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/en/pool-member-detail.png",
      duration: 5,
      caption: "Every pick locks and shows. Check the points behind any player.",
      transition: "slide-up",
    },
    {
      type: "title",
      duration: 3,
      heading: "Start a pool free.",
      subheading: "squadranks.com · the organizer handles the pot, never us",
    },
  ],
};
