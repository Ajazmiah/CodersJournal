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
        target: process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_API_URL : 'http://localhost:5000',
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
