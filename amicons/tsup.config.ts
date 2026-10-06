import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  outDir: "dist",
  dts: false,
  sourcemap: true,
  external: ["react"],
  clean: true,
  splitting: false,
  cjsInterop: true,
});
