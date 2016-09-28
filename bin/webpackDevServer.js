const path = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const gzipStastic = require('connect-gzip-static');
const webpack = require('webpack');
const debug = require('./debug');

const config = require('../config/webpack.config');
const basePath = path.join(__dirname, '..');

const app = express();

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  progress: true,
  noInfo: true,
  quiet: true,
  stats : {
    colours: true,
    timings: true,
  }
}));
app.use(require('webpack-hot-middleware')(compiler));

debug('⌛  Webpack bundling assets for the first time...');

app.use('/api', proxy('http://localhost:3000', {}));
app.get('*', (req, res) => {
  res.sendFile(path.join(basePath, 'dist', 'index.html'));
});

module.exports = app;
