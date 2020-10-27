import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';

import pkg from './package.json';

export default [
  {
    input: './index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  {
    input: 'lib/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'auto',
        compact: true,
      },
      {
        file: pkg.module,
        format: 'esm', // the preferred format
        exports: 'auto',
        name: pkg.settings.moduleName,
        compact: true,
      },
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
      resolve(),
      commonjs(),
      filesize(),
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
      }),
      eslint({
        fix: true,
        // throwOnError: true,
      }),
      ...pkg.settings.minify ? [
        terser(),
      ] : [],
    ],
  },
];
