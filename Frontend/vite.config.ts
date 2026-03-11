import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({ include: [/\.tsx?$/] }) // apenas arquivos TSX/TS
  ],
  server: {
    port: 5173, // opcional: define a porta do dev server
  },
  resolve: {
    alias: {
      '@': '/src', // facilita imports relativos
    },
  },
});