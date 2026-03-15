#!/usr/bin/env node

import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyCSS() {
  const srcCss = join(__dirname, "../src/amicons.css");
  const distCss = join(__dirname, "../dist/amicons.css");

  try {
    const css = await fs.readFile(srcCss, "utf-8");
    await fs.writeFile(distCss, css);
    console.log("✓ CSS copied to dist/");
  } catch (error) {
    console.error("Failed to copy CSS:", error);
    process.exit(1);
  }
}

copyCSS();
