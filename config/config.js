import env from '../constants/env';

const nodeEnvIsProd = process.env.NODE_ENV === env.production;
export default Object.freeze({
  nodeENV: process.env.NODE_ENV === env.production ? env.production : env.development,
  nodeEnvIsProd,
  apiOrigin: process.env.NODE_ENV === env.production ? 'https://url-shortener-back.appspot.com' : 'http://localhost:3033',
  apiHostName: process.env.NODE_ENV === env.production ? 'url-shortener-back.appspot.com' : 'localhost:3033',
});
