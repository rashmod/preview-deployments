import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/math.ts"],
  format: ["esm"],
  clean: true,
});
