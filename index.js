const config = require('config');
const bunyan = require('bunyan');
const RotatingFileStream = require('bunyan-rotating-file-stream');
const dbConnect = require('./db/connect');
const fs = require('fs');

function initLogger(name) {
  const logsDir = './logs';

  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  global.logger = bunyan.createLogger({
    name,
    level: config.logLevel,
    src: true,
    streams: [
      {
        level: config.logLevel,
        stream: process.stdout,
      },
      {
        level: config.logLevel,
        type: 'raw',
        stream: new RotatingFileStream({
          path: `logs/${name}-%Y-%m-%d.log`,
          period: '1d',
          totalFiles: 90,
          rotateExisting: true,
          threshold: '10m',
          totalSize: '20m',
          gzip: true,
        }),
      },
    ],
  });
  global.logger.info(
    '\nurl \t:',
    config.url,
    '\nport\t:',
    config.port,
    '\nlog level\t:',
    config.logLevel,
    '\nEnvironment\t:',
    config.env
  );
}

async function start() {
  try {
    initLogger('api');
    await dbConnect();
    require('./server');
    global.logger.info('Server started successfully on port :', config.port, config.env);
  } catch (error) {
    console.log('Something went wrong while starting server :', error);
    process.exit(-1);
  }
}
start();
