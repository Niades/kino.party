import fs from 'fs'
import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import define from 'rollup-plugin-define'
import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import styles from 'rollup-plugin-styles'
import nodePolyfills from 'rollup-plugin-polyfill-node'

export default [
  {
    input: ['src/injection/index.ts'],
    output: {
      file: 'dist/inject-bundle.js',
      format: 'iife',
    },
    plugins: [
      typescript(),
      styles(),
      resolve({
        preferBuiltins: false,
      }),
      commonjs(),
      nodePolyfills(),
      define({
        replacements: {
          'process.env.NODE_ENV': "'development'",
        },
      }),
      babel({
        exclude: new RegExp(
          fs
            .readFileSync(path.resolve('./non_ES5_node_modules'), 'utf-8')
            .slice(1, -2)
        ),
      }),
    ],
  },
  {
    input: ['src/manifest.json'],
    output: {
      dir: 'dist',
      format: 'esm',
    },
    plugins: [
      // always put chromeExtension() before other plugins
      chromeExtension(),
      simpleReloader(),
      typescript(),
      // the plugins below are optional
      resolve(),
      commonjs(),
    ],
  },
]
