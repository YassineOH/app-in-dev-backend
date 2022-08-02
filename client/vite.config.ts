import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "@rollup/plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      ...eslint({
        include: "src/**/*.+(js|jsx|tx|tsx)",
      }),
      enforce: "pre",
    },
    react(),
  ],
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
