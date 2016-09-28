const webpack            = require('webpack');
const path               = require('path');
const CaseSensitivePaths = require('case-sensitive-paths-webpack-plugin');
const ExtractText        = require('extract-text-webpack-plugin');
const HtmlPlugin         = require('html-webpack-plugin');
const Harddisk           = require('html-webpack-harddisk-plugin');
const HappyPack          = require('happypack');
const isProd             = process.env.NODE_ENV === 'production';
const basePath           = path.join(__dirname, '..');

module.exports = [
  new webpack.DllReferencePlugin({
    context: path.join(basePath, 'src'),
    manifest: require('../dll/vendor-manifest.json')
  }),
  new HappyPack({
    loaders: ['babel']
  }),
  new ExtractText({
    filename: '[name].[id].style.css',
    allChunks: true
  }),
  new CaseSensitivePaths(),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlPlugin({
    cache: true,
    inject: true,
    template: path.join(basePath, 'src', 'index.html'),
    alwaysWriteToDisk: true
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js',
    minChunks: Infinity
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    },
    __DEV__: !isProd
  }),
  new Harddisk()
];


