#!/usr/bin/env node

"use strict";

import { promises as fs } from "fs";
import { join, basename, extname, dirname } from "path";
import picocolors from "picocolors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iconsDir = join(__dirname, "../../docs/public/data/icons");
const pagesDir = join(__dirname, "../../docs/src/data/");

function getReactImportName(string) {
  return `ai${string
    .split("-")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join("")}`;
}

async function main(file) {
  const iconFilePath = join(iconsDir, file);
  let iconJson = {};

  try {
    const iconFile = await fs.readFile(iconFilePath, "utf8");
    iconJson = JSON.parse(iconFile);
  } catch (e) {
    console.error(`Failed to parse ${iconFilePath}:`, e.message);
  }

  const iconBasename = basename(file, extname(file));
  const iconTitle = getReactImportName(iconBasename);

  const jsonTemplate = `  {
    component: '${iconTitle}',
    categories: ${JSON.stringify(iconJson.categories || [])},
    tags: ${JSON.stringify(iconJson.tags || [])},
    slug: '${iconBasename}',
    icon: ${iconTitle}
  }`;

  return [iconTitle, jsonTemplate, iconJson.categories || []];
}

(async () => {
  try {
    const timeLabel = picocolors.cyan(`Library generation finished`);

    console.log(picocolors.cyan(`Library generation started`));
    console.time(timeLabel);

    const files = await fs.readdir(iconsDir);

    const names = [];
    const configs = [];
    const categoriesSet = new Set();

    // Read content from each icon
    const results = await Promise.all(files.map((file) => main(file)));

    results.forEach(([name, config, cats]) => {
      names.push(name);
      configs.push(config);
      cats.forEach((cat) => categoriesSet.add(cat));
    });

    // oxlint-disable-next-line no-unused-vars
    const categories = Array.from(categoriesSet).sort();

    const importsLine = names.join(", ");
    const configsLine = configs.join(",\n");

    const template = `import { ${importsLine} } from '@studio384/amicons';\n\nconst icons = [\n${configsLine}\n];\n\nexport default icons;`;

    await fs.writeFile(join(pagesDir, "icons.ts"), template);

    // const categoriesTemplate = `
    // import { aiCircleDashed } from '@studio384/amicons';

    // const categories = [${categories.map(
    // (cat) => `
    // {
    // slug: "${cat}",
    // title: "${cat}",
    // icon: aiCircleDashed
    // }`,
    // )}
    // ];

    // export default categories;`;

    // await fs.writeFile(path.join(pagesDir, `categories.ts`), categoriesTemplate)

    const filesLength = files.length;

    console.log(
      picocolors.green("\nSuccess, %s icon%s written to library!"),
      filesLength,
      filesLength !== 1 ? "s" : "",
    );
    console.timeEnd(timeLabel);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
