import vue from "rollup-plugin-vue";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import summary from "rollup-plugin-summary";

export default [
  {
    input: "src/index.js",
    output: {
      format: "esm",
      file: "dist/vue-modal-dialog.js",
    },
    plugins: [
      vue({ css: false }),
      postcss({ extract: "vue-modal-dialog.css" }),
      terser({
        ecma: 2020,
        module: true,
      }),
      summary(),
    ],
  },
];
