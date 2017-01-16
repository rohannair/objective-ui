const webpack  = require('webpack')
const path     = require('path')

const postcss  = require('./postcss')

const basePath = path.join(__dirname, '..')
const paths    = require('./paths')

// Plugins
const CaseSensitivePaths = require('case-sensitive-paths-webpack-plugin')
const CommonsPlugin      = require('webpack/lib/optimize/CommonsChunkPlugin')
const ExtractText        = require('extract-text-webpack-plugin')
const FaviconsPlugin     = require('favicons-webpack-plugin')
const HtmlPlugin         = require('html-webpack-plugin')

module.exports = {
  bail: true,
  devtool: 'source-map',

  entry: {
    bundle: [
      paths.appIndexJs
    ],
    vendor: [
      'apollo-client',
      'auth0-lock',
      'axios',
      'classnames',
      'cookies-js',
      'dateformat',
      'draft-js',
      'immutable',
      'isomorphic-fetch',
      'jwt-decode',
      'ramda',
      'react',
      'react-apollo',
      'react-dom',
      'react-hot-loader',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redbox-react',
      'redux',
      'redux-immutable',
      'redux-logger',
      'redux-saga',
      'styled-components'
    ]
  },

  output: {
    path: paths.appBuild,
    publicPath: '/',
    pathinfo: true,
    filename: '[name].[hash].js',
    chunkFilename: '[name].js',
    sourceMapFilename: '[name].[hash].js.map',
  },

  module: {
    loaders: [
      {
        test: /\.(graphql|gql)$/,
        include: paths.appSrc,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.jsx?$/,
        include: paths.appSrc,
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        include: paths.appSrc,
        loader: ExtractText.extract(
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        )
      },
      {
        test: /\.css$/,
        include: paths.appNodeModules, // For node CSS only
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        include: paths.appNodeModules, // For node SCSS only
        loaders: [
          'style',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass?sourceMap',
          'toolbox'
        ]
      },
      {
        test: /\.svg$/,
        include: [path.join(basePath, 'src')],
        loader: 'babel!svg-react'
      }
    ]
  },

  resolve: {
    fallback: paths.nodePaths,
    extensions: ['.js', '.css', ''],
    modulesDirectories: ['./node_modules', './src']
  },

  stats: {
    colors: true,
    timings: false,
    reasons: false,
    children: false,
    chunkModules: false
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  postcss,
  toolbox: {
    theme: path.join(paths.appSrc, 'styles/_react-toolbox.theme.scss')
  },

  plugins: [
    new CaseSensitivePaths(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: false
    }),
    new ExtractText('styles.[hash].css' , {
      allChunks: true,
    }),
    new CommonsPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new HtmlPlugin({
      template: path.join(basePath, 'src', 'index.html'),
      inject: 'body',
      minify: { collapseWhitespace: true },
      favicon: path.join(basePath, 'favicon.ico')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    }),
    new webpack.optimize.DedupePlugin()
  ]
}
