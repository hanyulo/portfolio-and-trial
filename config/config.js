const env = require('../constants/env');
const nodeEnvIsProd = process.env.NODE_ENV === env.production;

module.exports = {
  nodeENV: process.env.NODE_ENV === env.production ? env.production : env.development,
  nodeEnvIsProd,
  apiOrigin: nodeEnvIsProd ? 'https://url-shortener-back.appspot.com' : 'http://localhost:3000'
};
