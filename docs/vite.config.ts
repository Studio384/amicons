import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import react from "@vitejs/plugin-react-swc";
import ReactCompiler from "babel-plugin-react-compiler";
import * as path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    [ReactCompiler],
    tailwindcss(),
    react(),
    devtools(),
    visualizer({
      title: "Package size",
      filename: "stats/index.html",
      template: "treemap",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/amicons/",
  envPrefix: "AMICONS_",
});
