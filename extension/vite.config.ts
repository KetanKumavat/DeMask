import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        outDir: "dist",
        watch: process.env.NODE_ENV === "development" ? {} : undefined,
        rollupOptions: {
            input: {
                main: "index.html",
                background: "src/background.js",
                content: "src/content.js",
            },
            output: {
                entryFileNames: "[name].js",
            },
        },
    },
});
