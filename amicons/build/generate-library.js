#!/usr/bin/env node

"use strict";

import { promises as fs } from "fs";
import { readFileSync } from "fs";
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
  const iconFile = readFileSync(iconFilePath);

  let iconJson = {};

  try {
    iconJson = JSON.parse(iconFile);
  } catch (e) {
    console.log(iconFilePath);
  }

  const iconBasename = basename(file, extname(file));
  const iconTitle = getReactImportName(iconBasename);

  const jsonTemplate = `
  {
    component: '${iconTitle}',
    categories: ${JSON.stringify(iconJson.categories)},
    tags: ${JSON.stringify(iconJson.tags)},
    slug: '${iconBasename}',
    icon: ${iconTitle}
  }`;

  return [`${iconTitle}`, jsonTemplate, iconJson.categories];
}

(async () => {
  try {
    const timeLabel = picocolors.cyan(`Library generation finished`);

    console.log(picocolors.cyan(`Library generation started`));
    console.time(timeLabel);

    const files = await fs.readdir(iconsDir);

    const names = [];
    const configs = [];
    let categories = new Set();

    // Read content from each icon
    await Promise.all(
      files.map(async (file) => {
        const [name, config, cats] = await Promise.resolve(main(file));

        names.push(name);
        configs.push(config);

        cats.map((cat) => {
          categories.add(cat);
        });
      }),
    );

    categories = Array.from(categories).sort();

    const template = `
import { ${names.map((icon) => `${icon}`)} } from '@studio384/amicons';

const icons = [${configs.map((page) => `${page}`)}
];

export default icons;`;

    await fs.writeFile(join(pagesDir, `icons.ts`), template);

    const categoriesTemplate = `
import { aiCircleDashed } from '@studio384/amicons';

const categories = [${categories.map(
      (cat) => `
  {
    slug: "${cat}",
    title: "${cat}",
    icon: aiCircleDashed
  }`,
    )}
];

export default categories;`;

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
