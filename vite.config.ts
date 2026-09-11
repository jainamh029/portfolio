import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project from /portfolio/; Vercel serves it from the domain root.
  base:
    (globalThis as { process?: { env?: Record<string, string> } }).process
      ?.env?.DEPLOY_TARGET === "gh-pages"
      ? "/portfolio/"
      : "/",
});
