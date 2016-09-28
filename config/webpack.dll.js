const path = require('path');
const webpack = require('webpack');
const basePath    = path.join(__dirname, '..');

module.exports = {
  entry: {
    vendor: [
      path.join(basePath, 'src', 'vendors.js')
    ]
  },

  output: {
    path: path.join(basePath, 'dist', 'dll'),
    filename: 'dll.[name].js',
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(basePath, 'dll', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve('basePath', 'src')
    })
  ],

  resolve: {
    root: path.resolve(basePath, 'src'),
    modules: [ 'node_modules' ]
  }
}
