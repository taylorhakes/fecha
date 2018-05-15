import uglify from 'rollup-plugin-uglify';

const plugins = [];
if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify());
}

export default [
  {
    input: 'fecha.js',
    plugins: plugins,
    output: {
      // How it will be exposed on window
      name: 'fecha',
      format: 'umd',
      file: 'fecha.min.js',
    }
  },
  {
    input: 'fecha.strict.js',
    plugins: plugins,
    output: {
      // How it will be exposed on window
      name: 'fecha',
      format: 'umd',
      file: 'fecha.strict.min.js',
    }
  },
];
