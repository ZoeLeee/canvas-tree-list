import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@lizhou/canvas-tree-list": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
});
