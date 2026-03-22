# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run preview          # Open Remotion Studio (live preview at localhost:3000)
npm run render           # Render a composition (prompts for ID)
npm run render:wc        # Render WC rankings demo → out/wc-rankings.mp4
npx remotion render src/index.ts <composition-id> <output.mp4>  # Render any composition
```

There are no tests or linting configured.

## Architecture

This is a Remotion 4.x project. Scripts (plain TypeScript data objects) drive video generation — no imperative video editing.

**Data flow:** `DemoScript` → `Root.tsx` registers as `Composition` → `ScriptRunner` maps scenes to `Sequence` components → each scene delegates to UI components (`BrowserFrame`, `TitleCard`, overlays).

**Entry point:** `src/index.ts` calls `registerRoot(RemotionRoot)`. `Root.tsx` iterates `allScripts[]` and creates one `<Composition>` per script.

**ScriptRunner** (`src/core/ScriptRunner.tsx`) is the main composition component. It converts scene durations to frame ranges via `timing.ts`, then renders each scene inside a `<Sequence>` wrapped with `<TransitionWipe>`. The `renderScene()` function switches on `scene.type` ("title" | "screenshot" | "split").

**Adding a new demo:** Create a script in `src/scripts/`, add screenshots to `public/screenshots/<project>/`, import the script in `Root.tsx` and add it to `allScripts`.

## Key Conventions

- **All coordinates are percentage-based (0–100)** for resolution independence — highlights, cursor paths, zoom regions.
- **Durations in scripts are seconds**, converted to frames via `Math.round(duration * fps)`.
- **Screenshots are referenced by path relative to `public/`** and loaded via Remotion's `staticFile()`.
- Scene type is a discriminated union (`Scene = ScreenshotScene | TitleScene | SplitScene`). Always switch on `scene.type`.
- Components use `useCurrentFrame()` + `interpolate()` for all animations — no CSS keyframes or external animation libraries.
- Transition entrance animations default to 15 frames. Caption fade in/out uses 10 frames of padding.
