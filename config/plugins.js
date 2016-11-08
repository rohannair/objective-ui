const webpack            = require('webpack');
const path               = require('path');

const ExtractText = require('extract-text-webpack-plugin');
const CaseSensitivePaths = require('case-sensitive-paths-webpack-plugin');
const HtmlPlugin         = require('html-webpack-plugin');
const Harddisk           = require('html-webpack-harddisk-plugin');
const isProd             = process.env.NODE_ENV === 'production';
const basePath           = path.join(__dirname, '..');

const plugins = [
  new CaseSensitivePaths(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    __DEV__: !isProd
  }),
  new ExtractText('styles.css' , {
    allChunks: true,
    disable: isProd
  })
]

const prodPlugins = [
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
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin()
];

module.exports = plugins
  .concat(isProd ? prodPlugins : devPlugins);
