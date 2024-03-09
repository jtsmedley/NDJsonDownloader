import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],
  splitting: false,
  sourcemap: false,
  noExternal: ["axios", "ndjson", "p-queue"],
  external: [],
  minify: true,
  minifyWhitespace: true,
  platform: "node",
  format: ["cjs"],
  clean: true,
});
