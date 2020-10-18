import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
  input: "lib/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      compact: true,
    },
    {
      file: pkg.module,
      format: "es", // the preferred format
      compact: true,
    },
    {
      file: pkg.browser,
      format: "iife",
      name: pkg.moduleName, // the global which can be used in a browser
      compact: true,
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [resolve(), commonjs(), terser(), filesize()],
};
