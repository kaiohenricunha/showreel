/**
 * Capture screenshots of wc-squad-rankings for demo videos.
 *
 * Usage:
 *   node scripts/capture.mjs          # rankings, both EN and PT
 *   node scripts/capture.mjs en       # rankings, EN only
 *   node scripts/capture.mjs pt       # rankings, PT only
 *   node scripts/capture.mjs pool     # demo prediction pool, both EN and PT
 *   node scripts/capture.mjs pool en  # demo prediction pool, EN only
 */
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const APP_URL = "https://wc-squad-rankings.vercel.app";
// The demo prediction pool (ads/marketing) lives on the canonical prod domain.
// Override with SHOWREEL_POOL_URL to capture from a local dev server, e.g.
// SHOWREEL_POOL_URL=http://localhost:5173 node scripts/capture.mjs pool en
const POOL_URL = process.env.SHOWREEL_POOL_URL || "https://www.squadranks.com";

const VIEWPORT = { width: 1920, height: 1080 };
// argv: [target?] [lang?]. `capture.mjs pool [en|pt]` captures the demo pool;
// otherwise the first arg stays the rankings language filter (back-compat:
// `capture.mjs en`).
const TARGET = process.argv[2] === "pool" ? "pool" : "rankings";
const LANG_FILTER = TARGET === "pool" ? process.argv[3] : process.argv[2]; // "en" | "pt" | undefined (both)

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function captureLanguage(browser, lang) {
  const outDir = join(ROOT, "public", "screenshots", "wc-rankings", lang);
  mkdirSync(outDir, { recursive: true });

  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  console.log(`\n=== Capturing ${lang.toUpperCase()} screenshots ===`);

  // Navigate to app
  await page.goto(APP_URL, { waitUntil: "networkidle" });
  await wait(2000);

  // Switch language if PT
  if (lang === "pt") {
    // Look for language switcher button
    const ptButton = page.locator('button:has-text("PT")').first();
    if (await ptButton.isVisible()) {
      await ptButton.click();
      await wait(1500);
      console.log("  Switched to Portuguese");
    } else {
      console.log("  WARNING: Could not find PT language button, trying URL param");
      await page.goto(`${APP_URL}?lang=pt`, { waitUntil: "networkidle" });
      await wait(2000);
    }
  }

  // 1. Composite view (default landing)
  console.log("  Capturing composite-view...");
  await page.screenshot({ path: join(outDir, "composite-view.png") });

  // 2. Dark mode (should be the default)
  console.log("  Capturing dark-mode...");
  await page.screenshot({ path: join(outDir, "dark-mode.png") });

  // 3. XI Rating tab
  console.log("  Capturing xi-rating-view...");
  const xiTab = page.locator('button:has-text("XI Rating"), [role="tab"]:has-text("XI Rating"), button:has-text("XI")').first();
  if (await xiTab.isVisible()) {
    await xiTab.click();
    await wait(1000);
  }
  await page.screenshot({ path: join(outDir, "xi-rating-view.png") });

  // 4. Bench Depth tab
  console.log("  Capturing bench-depth...");
  const benchTab = page.locator('button:has-text("Bench"), [role="tab"]:has-text("Bench")').first();
  if (await benchTab.isVisible()) {
    await benchTab.click();
    await wait(1000);
  }
  await page.screenshot({ path: join(outDir, "bench-depth.png") });

  // 5. France expanded in bench depth view
  console.log("  Capturing france-expanded-bench...");
  const franceRow = page.locator('text=/Fran[cç]e|França/').first();
  if (await franceRow.isVisible()) {
    await franceRow.click();
    await wait(1000);
  }
  await page.screenshot({ path: join(outDir, "france-expanded-bench.png") });

  // Close France if still expanded (click again)
  if (await franceRow.isVisible()) {
    await franceRow.click();
    await wait(500);
  }

  // 6. Switch back to Composite tab for slider and expansion
  console.log("  Capturing weight-slider-50...");
  const compositeTab = page.locator('button:has-text("Composite"), [role="tab"]:has-text("Composite"), button:has-text("Composto")').first();
  if (await compositeTab.isVisible()) {
    await compositeTab.click();
    await wait(1000);
  }

  // Find the slider and drag to ~50%
  const slider = page.locator('input[type="range"]').first();
  if (await slider.isVisible()) {
    const box = await slider.boundingBox();
    if (box) {
      const midX = box.x + box.width * 0.5;
      const midY = box.y + box.height / 2;
      await page.mouse.click(midX, midY);
      await wait(800);
    }
  }
  await page.screenshot({ path: join(outDir, "weight-slider-50.png") });

  // 7. Spain expanded
  console.log("  Capturing spain-expanded...");
  const spainRow = page.locator('text=/Espa[ñn]ha?|Spain/').first();
  if (await spainRow.isVisible()) {
    await spainRow.click();
    await wait(1000);
  }
  await page.screenshot({ path: join(outDir, "spain-expanded.png") });

  // Close Spain
  if (await spainRow.isVisible()) {
    await spainRow.click();
    await wait(500);
  }

  // 8. Light mode toggle
  console.log("  Capturing light-mode...");
  const themeToggle = page.locator('button[aria-label*="theme"], button[aria-label*="Theme"], button[aria-label*="mode"], button:has(svg)').first();
  // Try clicking a theme toggle — common patterns
  const toggleCandidates = [
    'button[aria-label*="theme"]',
    'button[aria-label*="Theme"]',
    'button[aria-label*="mode"]',
    'button[aria-label*="dark"]',
    'button[aria-label*="light"]',
    // Often a sun/moon icon button in the header
    'header button:last-child',
    'nav button:last-child',
  ];
  let toggled = false;
  for (const sel of toggleCandidates) {
    const btn = page.locator(sel).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click();
      await wait(800);
      toggled = true;
      console.log(`    Toggled theme via: ${sel}`);
      break;
    }
  }
  if (!toggled) {
    console.log("    WARNING: Could not find theme toggle");
  }
  await page.screenshot({ path: join(outDir, "light-mode.png") });

  // 9. Language switch screenshot — capture the language selector area
  // Toggle back to dark mode first
  if (toggled) {
    for (const sel of toggleCandidates) {
      const btn = page.locator(sel).first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        await wait(800);
        break;
      }
    }
  }
  console.log("  Capturing language-switch...");
  await page.screenshot({ path: join(outDir, "language-switch.png") });

  await context.close();
  console.log(`  Done — ${lang.toUpperCase()} screenshots saved to ${outDir}`);
}

// Capture the self-contained demo prediction pool at /pool/demo. It needs no
// sign-in, so the walk is just: land on My predictions, then the Members and
// Leaderboard tabs, then open a member's detail from the top leaderboard row.
// Locale comes from the path prefix (English at the root, /pt/... otherwise),
// so team names localize without touching the in-app language switcher.
async function capturePool(browser, lang) {
  const outDir = join(ROOT, "public", "screenshots", "wc-pool", lang);
  mkdirSync(outDir, { recursive: true });

  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  const path = lang === "en" ? "/pool/demo" : `/${lang}/pool/demo`;
  console.log(`\n=== Capturing ${lang.toUpperCase()} pool screenshots ===`);
  await page.goto(`${POOL_URL}${path}`, { waitUntil: "networkidle" });
  await wait(2000);

  // 1. My predictions (default tab)
  console.log("  Capturing pool-predictions...");
  await page.screenshot({ path: join(outDir, "pool-predictions.png") });

  // 2. Members tab
  console.log("  Capturing pool-members...");
  await page.locator('[data-testid="bolao-tab-members"]').first().click();
  await wait(1200);
  await page.screenshot({ path: join(outDir, "pool-members.png") });

  // 3. Leaderboard tab
  console.log("  Capturing pool-leaderboard...");
  await page.locator('[data-testid="bolao-tab-leaderboard"]').first().click();
  await wait(1200);
  await page.screenshot({ path: join(outDir, "pool-leaderboard.png") });

  // 4. Member detail — clicking the top leaderboard row opens that member's
  //    locked predictions. Captured last so we never have to close the modal.
  console.log("  Capturing pool-member-detail...");
  await page.locator('[data-testid="lb-row"]').first().click();
  await wait(1200);
  await page.screenshot({ path: join(outDir, "pool-member-detail.png") });

  await context.close();
  console.log(`  Done — ${lang.toUpperCase()} pool screenshots saved to ${outDir}`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  try {
    const languages = LANG_FILTER ? [LANG_FILTER] : ["en", "pt"];
    const capture = TARGET === "pool" ? capturePool : captureLanguage;
    for (const lang of languages) {
      await capture(browser, lang);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
