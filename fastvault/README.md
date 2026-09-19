# fastvault/

This directory holds the FastVault rebrand overlay for this Android app fork.

Before running any Gradle build on the `fastvault` branch, run `node fastvault/apply.mjs`
once against a clean checkout. It rewrites the app name shown under the launcher icon
and in the app switcher, and generates the adaptive-icon launcher foreground PNGs (one
per density) from `fastvault/app-icon.svg`. Without this step, the build will fail: the
committed `app/src/main/res/mipmap-anydpi/ic_launcher.xml` already references
`@mipmap/ic_launcher_foreground`, a resource that only exists after the overlay runs.

The overlay's generated output (the PNGs, and the rewritten strings file) should never
be committed — only the script itself and its source assets (`app-icon.svg`) are
committed. Run it fresh every time; CI does this automatically in
`.github/workflows/fastvault-build.yml`.
