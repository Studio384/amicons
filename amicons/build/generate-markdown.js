#!/usr/bin/env node

"use strict";

import { promises as fs } from "fs";
import { join, basename, dirname } from "path";
import picocolors from "picocolors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iconsDir = join(__dirname, "../../docs/public/data/icons/");
const pagesDir = join(__dirname, "../../docs/public/data/md/");

(async () => {
  try {
    const timeLabel = picocolors.cyan(`Page generation finished`);

    console.log(picocolors.cyan(`Page generation started`));
    console.time(timeLabel);

    const files = await fs.readdir(iconsDir);

    files
      .filter((file) => file.endsWith(".json"))
      .forEach(async (file) => {
        const filePath = join(iconsDir, file);
        const raw = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(raw);

        const markdown = `---
title: ${data.title}
categories: [${data.categories.join(", ")}]
tags: [${data.tags.join(", ")}]
created: ${data.created}
updated: ${data.updated}
---`;
        const baseName = basename(file, ".json");
        const outPath = join(pagesDir, `${baseName}.md`);
        fs.writeFile(outPath, markdown, "utf8");
        console.log(`Created: ${outPath}`);
      });

    const filesLength = files.length;

    console.log(
      picocolors.green("\nSuccess, %s page%s created!"),
      filesLength,
      filesLength !== 1 ? "s" : "",
    );
    console.timeEnd(timeLabel);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
