import uglify from "rollup-plugin-uglify";
import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";

export default [
  // Compressed (for direct consumption in browser)
  // written to dist folder, minified.
  {
    input: "src/fecha.ts",
    output: {
      // How it will be exposed on window
      name: "fecha",
      format: "umd",
      file: "dist/fecha.min.js",
      exports: "named"
    },
    plugins: [typescript(), uglify(), sourceMaps()]
  },
  // For Node: no minify, output in lib dir
  {
    input: "src/fecha.ts",
    output: {
      name: "fecha",
      format: "umd",
      file: "lib/fecha.umd.js",
      exports: "named"
    },
    plugins: [typescript()]
  },
  {
    input: "src/fecha.ts",
    output: {
      name: "fecha",
      format: "esm",
      file: "lib/fecha.js",
      exports: "named"
    },
    plugins: [typescript()]
  }
];
