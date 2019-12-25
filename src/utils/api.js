import _get from 'lodash/get';
import config from '../../config/config';
import { AuthContextManager } from './localStorage';

const { clearAtuhContext, setAuthContext } = AuthContextManager();

const { apiOrigin } = config;

const _ = {
  get: _get,
};

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
  const getHeaders = (() => {
    if (accessToken) {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  });
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: getHeaders(),
    redirect: 'follow',
    referrer: 'no-referrer',
  };
  const res = await asyncResolver(fetch(`${apiOrigin}/api/retrieve-user-profile`, options));
  const response = res.data;
  if (response.ok) {
    const userProfile = _.get(response, 'response.data', null);
    setAuthContext({ userProfile, authorized: true });
    return userProfile;
  }
  return null;
};

const signOut = async () => {
  clearAtuhContext();
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  };
  const res = await asyncResolver(fetch(`${apiOrigin}/user/signout`, options));
  const response = res.data;
  if (response.ok) {
    return _.get(response, 'response.statusCode', null);
  }
  return null;
};

const signIn = async (email, password) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
    redirect: 'follow',
    referrer: 'no-referrer',
  };
  const res = await asyncResolver(fetch(`${apiOrigin}/user/signin`, options));
  const response = res.data;
  if (response.ok) {
    return {
      ok: true,
    };
  }
  return {
    ok: false,
    errorMessage: _.get(response, 'response.errorMessage', null),
  };
};

const signUp = async ({
  username,
  email,
  password,
  firstName,
  lastName,
}) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      firstName,
      lastName,
    }),
    redirect: 'follow',
    referrer: 'no-referrer',
  };
  const res = await asyncResolver(fetch(`${apiOrigin}/user/signup`, options));
  const response = res.data;
  if (response.ok) {
    return {
      ok: true,
      message: _.get(response, 'response.data.message', null),
    };
  }
  return {
    ok: false,
    errorMessage: _.get(response, 'response.errorMessage', null),
  };
};


export default {
  createShortUrl,
  fetchUserProfile,
  signOut,
  signIn,
  signUp,
};

export {
  createShortUrl,
  fetchUserProfile,
  signOut,
  signIn,
  signUp,
};
