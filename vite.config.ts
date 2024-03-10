import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@lizhou/canvas-tree-list": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [/konva/],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: (name) => {
          if (name.startsWith("konva")) {
            return "Konva";
          }
        },
      },
    },
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "CanvasList",
      formats: ["umd", "es", "cjs", "iife"],
      fileName: (format) => `canvas-tree-list.${format}.js`,
    }
  }
});
