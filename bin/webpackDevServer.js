const path = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const gzipStastic = require('connect-gzip-static');
const webpack = require('webpack');
const debug = require('./debug');

const config = require('../webpack.config');
const basePath = path.join(__dirname, '..');

const app = express();

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: config.stats
}));
app.use(require('webpack-hot-middleware')(compiler));

debug('⌛  Webpack bundling assets for the first time...');

app.use('/api', proxy('http://localhost:3000', {
  preserveHostHdr: true
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(basePath, 'index.html'));
});

module.exports = app;
