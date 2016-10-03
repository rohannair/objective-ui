const chalk = require('chalk');
const devServer = require('./webpackDevServer');
const debug = require('./debug');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '8080';

devServer.listen(PORT, HOST, (err) => {
  if (err) return console.error(err);

  debug(`🐑 💨 💨  App running at ${chalk.white(`${HOST}:${PORT}`)}`);
})
