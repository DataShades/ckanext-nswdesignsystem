import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    publicDir: false,
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
