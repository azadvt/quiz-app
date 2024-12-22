'use strict';

const config = require('config');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const HTTPStatus = require('http-status');
const cors = require('cors');
const constants = require('./helpers/constants');

const server = express();

server.enable('trust proxy');

server.use(helmet());
server.use(cors());
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

server.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    const response = {
      status: constants.STATUS_MESSAGES.FAILED_MSG,
      error: { message: 'Invalid JSON format' },
    };
    res.status(HTTPStatus.BAD_REQUEST).send(response);
  } else {
    next();
  }
});

// Initialize server routers
require('./routes')(server);
require('dotenv').config();
// Handle unmatched routes (404)
server.use('*', (req, res) => {
  res.status(HTTPStatus.NOT_FOUND).send({ status: 'failed', message: HTTPStatus[404] });
});

// Start the server
const PORT = config.port || 3000;
server.listen(PORT, () => {
  console.log(`Quiz application server is running on port ${PORT}`);
});
