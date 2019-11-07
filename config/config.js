import env from '../constants/env';

const nodeEnvIsProd = process.env.NODE_ENV === env.production;
export default Object.freeze({
  nodeENV: process.env.NODE_ENV === env.production ? env.production : env.development,
  nodeEnvIsProd,
  apiOrigin: nodeEnvIsProd ? 'https://url-shortener-back.appspot.com' : 'http://localhost:3000',
});
