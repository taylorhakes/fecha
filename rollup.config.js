import uglify from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";

const browserPlugins = [];
if (process.env.NODE_ENV === "production") {
  browserPlugins.push(uglify());
}

export default [
  // Compressed (for direct consumption in browser)
  // written to dist folder, minified.
  {
    input: "src/fecha.js",
    plugins: browserPlugins,
    output: {
      // How it will be exposed on window
      name: "fecha",
      format: "umd",
      file: "dist/fecha.min.js"
    },
    plugins: [babel()]
  },
  // For Node: no minify, output in lib dir
  {
    input: "src/fecha.js",
    output: {
      name: "fecha",
      format: "umd",
      file: "lib/fecha.umd.js"
    },
    plugins: [babel()]
  }
];
