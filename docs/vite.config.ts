import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import react from "@vitejs/plugin-react-swc";
import ReactCompiler from "babel-plugin-react-compiler";
import * as path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    [ReactCompiler],
    mdx({
      rehypePlugins: [[rehypePrettyCode, { theme: "dark-plus" }]],
    }),
    tailwindcss(),
    react(),
    devtools(),
    visualizer({
      title: "Package size",
      filename: "stats.html",
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
