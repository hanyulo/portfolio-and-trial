import config from '../../config/config';

const { apiOrigin } = config;

const postOption = (body) => Object.freeze({
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
  const res = await asyncResolver(fetch(`${apiOrigin}/api/shorturl/new`, postOption(bodyObj)));
  return res;
};

const fetchUserProfile = async (accessToken) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  };
  const res = await asyncResolver(fetch(`${apiOrigin}/api/retrieve-user-profile`, options));
  return res;
};

export default {
  createShortUrl,
  fetchUserProfile,
};

export {
  createShortUrl,
  fetchUserProfile,
};
