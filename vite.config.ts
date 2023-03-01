import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  define: {
    "import.meta.vitest": false,
  },
  // @ts-ignore
  test: {
    includeSource: ["src/**/*.{js,ts}"],
  },
});
