#!/usr/bin/env node
// FastVault rebrand overlay for the Android app. Run at build time against a clean
// checkout of the `fastvault` branch — never commit its output. Mirrors the
// exact-match-or-fail convention used by fastvault-clients' own apply.mjs so a
// silent no-op (upstream changed the text) fails loudly instead of shipping unbranded.
import { readFileSync, writeFileSync } from "node:fs";

function fail(msg) {
  console.error(`::error::${msg}`);
  process.exit(1);
}

function replaceExact(path, from, to) {
  const content = readFileSync(path, "utf8");
  if (!content.includes(from)) {
    fail(`${path}: expected text not found: ${JSON.stringify(from)}`);
  }
  writeFileSync(path, content.replace(from, to), "utf8");
  console.log(`${path}: replaced`);
}

// App name shown under the launcher icon and in the app switcher.
replaceExact(
  "app/src/main/res/values/strings_non_localized.xml",
  `<string name="app_name" translatable="false">Bitwarden Dev</string>`,
  `<string name="app_name" translatable="false">FastVault Dev</string>`,
);

// Adaptive icon background color — reuse FastVault's established brand-500 shade
// (the same hex used as the primary brand color across the browser extension and
// desktop app's tw-theme.css brand-500 remap in fastvault-clients/fastvault/apply.mjs).
// Note: the actual file contains the alpha channel prefix (#FF), so we preserve it.
replaceExact(
  "app/src/main/res/values/ic_launcher_background.xml",
  `<color name="ic_launcher_background">#FF175DDC</color>`,
  `<color name="ic_launcher_background">#FF2BBE8B</color>`,
);

console.log("FastVault Android overlay (text) applied.");
