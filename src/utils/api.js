import config from '../../config/config';

const { apiOrigin } = config;

const getPostOption = (body) => Object.freeze({
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'omit',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrer: 'no-referrer',
  body: JSON.stringify(body),
});

const asyncResolver = async (promise) => {
  const res = {
    data: null,
    error: null,
  };
  try {
    const response = await promise;
    res.data = await response.json();
    return res;
  } catch (e) {
    res.error = e;
    return res;
  }
};

const createShortUrl = async (bodyObj) => {
  const res = await asyncResolver(fetch(`${apiOrigin}/api/shorturl/new`, getPostOption(bodyObj)));
  return res;
};

export default {
  createShortUrl,
};

export {
  createShortUrl,
};
