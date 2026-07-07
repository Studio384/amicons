import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const rootPackagePath = path.join(rootDir, "package.json");
const docsPackagePath = path.join(rootDir, "docs", "package.json");
const libraryPackagePath = path.join(rootDir, "amicons", "package.json");

const readJson = async (filePath) => JSON.parse(await readFile(filePath, "utf8"));

const writeJson = async (filePath, data) => {
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
};

const rootPackage = await readJson(rootPackagePath);

if (!rootPackage.version) {
  throw new Error("Root package.json must contain a version field.");
}

const targetVersion = rootPackage.version;
const docsPackage = await readJson(docsPackagePath);
const libraryPackage = await readJson(libraryPackagePath);

docsPackage.version = targetVersion;
libraryPackage.version = targetVersion;

await Promise.all([
  writeJson(docsPackagePath, docsPackage),
  writeJson(libraryPackagePath, libraryPackage),
]);

console.log(`Synchronized package versions to ${targetVersion}`);
