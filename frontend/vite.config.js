import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from 'path';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://coderjournal-backend.onrender.com",
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@components': path.resolve(__dirname, './src/components'),
    }
  },
  define: {
    global: {},
  },
});
