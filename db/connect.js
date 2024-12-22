const mongoose = require('mongoose');
const config = require('config');

function dbConnect() {
  return new Promise((resolve, reject) => {
    const dbUrl = config.db.url;
    if (!dbUrl) {
      return reject(new Error('Database URL is not defined in the configuration.'));
    }

    mongoose
      .connect(dbUrl)
      .then(() => {
        global.logger.info('Database connected successfully.');
        resolve();
      })
      .catch((error) => {
        global.logger.error('Database connection error:', error.message);
        reject(error);
      });
  });
}

module.exports = dbConnect;
