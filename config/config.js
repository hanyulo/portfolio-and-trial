const env = require('../constants/env');

module.exports = Object.freeze({
  apiOrigin: process.NODE_ENV === env.production ? 'http://localhost:3000' : 'https://url-shortener-back.appspot.com'
});
