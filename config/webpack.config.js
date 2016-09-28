const webpack     = require('webpack');
const path        = require('path');

const plugins     = require('./plugins');
const postcss     = require('./postcss');
const isProd      = process.env.NODE_ENV === 'production';
const basePath    = path.join(__dirname, '..');

const ExtractText = require('extract-text-webpack-plugin');
const packages    = require('../package.json');

module.exports = {
  bail: isProd,
  cache: !isProd,
  debug: !isProd,
  devtool: isProd ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  target: 'web',

  entry: {
    bundle: [
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      path.join(basePath, 'src', 'index.js')
    ]
  },

  eslint: {
    configFile: path.join(basePath, '.eslintrc')
  },

  output: {
    path: path.join(basePath, 'dist'),
    publicPath: '/',
    filename: isProd ? '[name].[hash].js' : '[name].js',
    chunkFilename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [path.join(basePath, 'src')],
        exclude: [path.join(basePath, 'node_modules')],
        loader: 'happypack/loader',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: ExtractText.extract({
          fallbackLoader: 'style',
          loader: ['css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss']})
      },
      {
        test: /\.scss$/,
        loader: ExtractText.extract({
          fallbackLoader: 'style',
          loader: ['css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass-loader']})
      }
    ]
  },

  resolve: {
    extensions: ['', '.js'],
    modules: [
      path.join(basePath, 'src'),
      'node_modules'
    ]
  },

  postcss,
  plugins
}
