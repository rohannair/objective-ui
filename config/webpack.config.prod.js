const webpack     = require('webpack');
const path        = require('path');

const postcss     = require('./postcss');

const basePath    = path.join(__dirname, '..');
const paths    = require('./paths');

// Plugins
const ExtractText        = require('extract-text-webpack-plugin');
const CaseSensitivePaths = require('case-sensitive-paths-webpack-plugin');
const HtmlPlugin         = require('html-webpack-plugin');

module.exports = {
  bail: true,
  devtool: 'source-map',

  entry: {
    bundle: [
      require.resolve('./polyfills'),
      paths.appIndexJs
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
  plugins: [
    new CaseSensitivePaths(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: false
    }),
    new ExtractText('styles.css' , {
      allChunks: true,
    }),
    new HtmlPlugin({
      chunksSortMode : 'dependency',
      template: path.join(basePath, 'src', 'index.html'),
      inject: 'body',
      minify: { collapseWhitespace: true }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    }),
    new webpack.optimize.DedupePlugin()
  ]
}
