import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import filesize from "rollup-plugin-filesize";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";

import pkg from "./package.json";

export default [
  {
    input: "./index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
  {
    input: "lib/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "auto",
        compact: true,
      },
      {
        file: pkg.module,
        format: "esm", // the preferred format
        exports: "auto",
        name: pkg.moduleName,
        compact: true,
      },
      {
        file: pkg.browser,
        format: "iife",
        exports: "auto",
        name: pkg.moduleName, // the global which can be used in a browser
        compact: true,
      },
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
      resolve(),
      commonjs(),
      terser(),
      filesize(),
      babel({
        babelHelpers: "bundled",
        inputSourceMap: true,
        sourceMaps: true,
      }),
      eslint({
        fix: true,
        // throwOnError: true,
      }),
    ],
  },
];
