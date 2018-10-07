import uglify from 'rollup-plugin-uglify';

const browserPlugins = [];
if (process.env.NODE_ENV === 'production') {
  browserPlugins.push(uglify());
}

export default [
  // Compressed (for direct consumption in browser)
  // written to dist folder, minified.
  {
    input: 'src/fecha.js',
    plugins: browserPlugins,
    output: {
      // How it will be exposed on window
      name: 'fecha',
      format: 'umd',
      file: 'dist/fecha.min.js',
    }
  },
  {
    input: 'src/fecha.strict.js',
    plugins: browserPlugins,
    output: {
      name: 'fecha',
      format: 'umd',
      file: 'dist/fecha.strict.min.js',
    }
  },
  // For Node: no minify, output in lib dir
  {
    input: 'src/fecha.js',
    output: {
      name: 'fecha',
      format: 'umd',
      file: 'lib/fecha.umd.js',
    }
  },
  {
    input: 'src/fecha.strict.js',
    output: {
      name: 'fecha',
      format: 'umd',
      file: 'lib/fecha.strict.umd.js',
    }
  },
];
