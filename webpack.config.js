const webpack     = require('webpack');
const path        = require('path');

const plugins     = require('./config/plugins');
const postcss     = require('./config/postcss');

const isProd      = process.env.NODE_ENV === 'production';
const basePath    = __dirname;

const ExtractText = require('extract-text-webpack-plugin');
const packages    = require('./package.json');

module.exports = {
  bail: isProd,
  cache: !isProd,
  debug: !isProd,
  devtool: '#cheap-module-inline-source-map',

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

  output: isProd
  ? {
    path: path.join(basePath, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].js',
    sourceMapFilename: '[name].[hash].js.map',
  }
  : {
    path: path.join(basePath, 'dist'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [path.join(basePath, 'src')],
        exclude: [path.join(basePath, 'node_modules')],
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js'],
    root: path.resolve(__dirname, 'src'),
    modulesDirectories: ['./node_modules']
  },

  stats: {
    colors: true,
    timings: true,
    reasons: true
  },

  postcss,
  plugins
}
