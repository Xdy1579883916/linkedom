import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";

export default {
  input: "./esm/index.js",
  plugins: [shims(), nodeResolve(), commonjs(), json(), terser(), babel()],
  output: {
    file: "./worker.js",
    format: "esm",
  },
};

function shims() {
  return {
    resolveId(specifier) {
      if (specifier.endsWith("perf_hooks.cjs")) {
        return "shim:perf_hooks";
      }
      if (specifier.endsWith("canvas.cjs")) {
        return "shim:canvas";
      }
    },
    load(id) {
      switch (id) {
        case "shim:perf_hooks": {
          return `
            export const performance = globalThis.performance;
          `;
        }
        case "shim:canvas": {
          return `
            class Canvas {
              constructor(width, height) {
                this.width = width;
                this.height = height;
              }
              getContext() { return null; }
              toDataURL() { return ''; }
            }
            export default {createCanvas: (width, height) => new Canvas(width, height)};
          `;
        }
      }
    },
  };
}
