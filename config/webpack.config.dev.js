const webpack  = require('webpack');
const path     = require('path');

const postcss  = require('./postcss');

const basePath = path.join(__dirname, '..');
const paths    = require('./paths');

// Plugins
const CaseSensitivePaths = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  cache: true,
  debug: true,
  devtool: 'eval',

  entry: {
    bundle: [
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      require.resolve('./polyfills'),
      path.join(basePath, 'src', 'index.js')
    ]
  },

  eslint: {
    configFile: path.join(basePath, '.eslintrc')
  },

  output: {
    path: path.join(basePath, 'dist'),
    pathinfo: true,
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
        loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
