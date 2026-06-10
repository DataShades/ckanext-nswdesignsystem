import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  publicDir: false,
  plugins: [
    {
      name: "prepend-semicolon",
      generateBundle(options, bundle) {
        for (const chunk of Object.values(bundle)) {
          if (chunk.type === "chunk") {
            chunk.code = ";" + chunk.code + "\n";
          }
        }
      },
    },
  ],

  build: {
    lib: {
      entry: resolve(__dirname, "assets/src/main.ts"),
      formats: ["iife"],
      fileName: (format) => `ui.js`,
      name: "ThemingUI",
    },
    outDir: "assets",
    emptyOutDir: false,
  },
});
