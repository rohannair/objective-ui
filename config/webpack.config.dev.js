const webpack  = require('webpack')
const path     = require('path')

const postcss  = require('./postcss')

const basePath = path.join(__dirname, '..')
const paths    = require('./paths')

// Plugins
const CaseSensitivePaths = require('case-sensitive-paths-webpack-plugin')
const CommonsPlugin      = require('webpack/lib/optimize/CommonsChunkPlugin')
const ExtractText        = require('extract-text-webpack-plugin')
const HtmlPlugin         = require('html-webpack-plugin')

module.exports = {
  cache: true,
  debug: true,
  devtool: 'cheap-module-eval-source-map',

  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://127.0.0.1:8080/',
      'webpack/hot/only-dev-server',
      path.join(basePath, 'src', 'index.js')
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
    path: path.join(basePath, 'dist'),
    pathinfo: true,
    filename: '[name].js',
    publicPath: '/',
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },

  devServer: {
    host: '0.0.0.0',
    inline: true,
    historyApiFallback: true,
    contentBase: path.join(basePath, 'dist'),
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        secure: false,
        pathRewrite: { '^/api' : '' }
      }
    },
    stats: {
      assets: false,
      cached: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      context: false,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      timings: false,
      version: false,

      colors: true,
      errorDetails: true
    }
  },

  eslint: {
    configFile: path.join(basePath, '.eslintrc')
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
        include: paths.appSrc, // For app CSS only
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
        include: paths.appSrc,
        loader: 'babel!svg-react'
      }
    ]
  },

  resolve: {
    fallback: paths.nodePaths,
    extensions: ['.js', '.css', ''],
    modulesDirectories: ['./node_modules', './src']
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: true
    }),
    new ExtractText('styles.css' , {
      allChunks: true,
    }),
    new CommonsPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new HtmlPlugin({
      template: path.join(basePath, 'src', 'index.html'),
      inject: 'body',
      favicon: path.join(basePath, 'favicon-dev.ico')
    })
  ]
}
