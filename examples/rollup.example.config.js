import vue from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";

export default [
  {
    input: "examples/basic-demo/main.js",
    output: {
      format: "iife",
      sourcemap: true,
      file: "examples/basic-demo/dist/app.js",
    },
    plugins: [
      resolve(),
      commonjs(),
      vue(),
      postcss(),
      replace({
        "process.env.NODE_ENV": '"development"',
        preventAssignment: true,
      }),
      esbuild({
        target: "es2015",
      }),
    ],
  },
];
