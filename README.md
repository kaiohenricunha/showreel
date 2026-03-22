# showreel

Script-driven demo video generator for React apps. Take screenshots of any app at various states, write a short script describing the demo flow, and Remotion renders a polished MP4 with browser frames, captions, cursor animations, highlights, and transitions.

## Quick Start

### 1. Add screenshots

Drop screenshots into `public/screenshots/<project-name>/`:

```
public/screenshots/my-app/
  home.png
  dashboard.png
  settings.png
```

### 2. Write a script

Create a script file in `src/scripts/`:

```ts
// src/scripts/my-app.ts
import { DemoScript } from "../core/types";

export const myAppDemo: DemoScript = {
  id: "my-app-demo",
  title: "My App",
  fps: 30,
  width: 1920,
  height: 1080,
  scenes: [
    { type: "title", duration: 3, heading: "My App", subheading: "A cool thing" },
    { type: "screenshot", src: "screenshots/my-app/home.png", duration: 4, caption: "Landing page", transition: "fade" },
    // ... more scenes
  ],
};
```

### 3. Register in Root.tsx

```ts
import { myAppDemo } from "./scripts/my-app";
const allScripts = [wcRankingsDemo, myAppDemo];
```

### 4. Preview & render

```bash
npm run preview          # Opens Remotion Studio
npm run render:wc        # Renders the WC rankings demo to out/wc-rankings.mp4
npx remotion render src/index.ts my-app-demo out/my-app.mp4
```

## Script Schema

See [`src/core/types.ts`](src/core/types.ts) for the full type definitions.

**Scene types:**
- `title` — Intro/outro title card with heading and subheading
- `screenshot` — Screenshot in a browser frame with optional caption, highlight, cursor animation, and transition
- `split` — Side-by-side comparison of two screenshots

**Coordinates** are percentage-based (0–100) for resolution independence.

## Commands

| Command | Description |
|---------|-------------|
| `npm run preview` | Open Remotion Studio for live preview |
| `npm run render` | Render (prompts for composition) |
| `npm run render:wc` | Render the WC rankings demo |
| `npx remotion render src/index.ts <id> <output>` | Render any composition |

## Adding a New Project Demo

1. Create `public/screenshots/<project>/` and add your screenshots
2. Create `src/scripts/<project>.ts` with a `DemoScript` export
3. Import it in `src/Root.tsx` and add to `allScripts`
4. Run `npm run preview` to verify, then render
