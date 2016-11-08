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
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',

  entry: {
    bundle: isProd
    ? [path.join(basePath, 'src', 'index.js')]
    :[
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
        include: [path.join(basePath, 'src')],
        loader: isProd
          ? ExtractText.extract(
            'style-loader',
            'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
          )
          : 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.css'],
    root: path.resolve(__dirname, 'src'),
    modulesDirectories: ['./node_modules', './src']
  },

  stats: {
    colors: true,
    timings: false,
    reasons: false,
    children: false,
    chunkModules: false
  },

  postcss,
  plugins
}
