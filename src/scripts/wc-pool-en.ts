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
      subheading: "Predict every match. Climb the table. No money held.",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/en/pool-predictions.png",
      duration: 5,
      caption:
        "Call the score on every match. Exact scores pay 10, the result pays 5.",
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/en/pool-members.png",
      duration: 4,
      caption: "Invite the group with a code, a link, or a QR. 17 in, 13 seats left.",
      transition: "slide-left",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/en/pool-leaderboard.png",
      duration: 6,
      caption:
        "One live table ranks everyone. Bruno leads on 80, you sit 8th on 43.",
      transition: "slide-left",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/en/pool-member-detail.png",
      duration: 5,
      caption: "Open any rival to see every locked pick and where the points went.",
      transition: "slide-up",
    },
    {
      type: "title",
      duration: 3,
      heading: "Start your pool free",
      subheading: "squadranks.com · the organizer handles the pot, never us",
    },
  ],
};
