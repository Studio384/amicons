#!/usr/bin/env node

import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dist = join(__dirname, "../dist");

async function copyCSS() {
  const srcCss = join(__dirname, "../src/amicons.css");
  const distCss = join(dist, "amicons.css");

  try {
    const css = await fs.readFile(srcCss, "utf-8");
    await fs.writeFile(distCss, css);
    console.log("✓ Copied stylesheet to dist/amicons.css");
  } catch (error) {
    console.error("Failed to copy stylesheet:", error);
    process.exit(1);
  }
}

/**
 * `tsc --emitDeclarationOnly` only writes ESM declarations, but the package also
 * publishes a CommonJS entry point. `require()` consumers resolve types through
 * `index.d.cts`, so mirror the ESM declarations across for them.
 */
async function copyDeclarations() {
  try {
    await fs.copyFile(join(dist, "index.d.ts"), join(dist, "index.d.cts"));
    console.log("✓ Mirrored declarations to dist/index.d.cts");
  } catch (error) {
    console.error("Failed to mirror declarations:", error);
    process.exit(1);
  }
}

/** The old `outDir` was `dist/esm`; drop it so stale output can't ship. */
async function cleanStaleEsm() {
  await fs.rm(join(dist, "esm"), { recursive: true, force: true });
}

await cleanStaleEsm();
await copyCSS();
await copyDeclarations();
