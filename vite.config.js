import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Strip debug console.log calls from production builds (errors are kept)
  esbuild: command === "build" ? { pure: ["console.log", "console.info", "console.debug"] } : undefined,
}))
