import https from 'https';
import http from 'http';
import _get from 'lodash/get';
import config from '../../../config/config';

const _ = {
  get: _get,
};

const { nodeEnvIsProd } = config;
const protocol = nodeEnvIsProd ? https : http;

const retrieveUserProfile = (accessToken) => new Promise((resolve, reject) => {
  const options = {
    hostName: 'localhost',
    port: 3033,
    path: '/retrieve-user-profile',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const req = protocol.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (response) => {
      const responseObj = JSON.parse(response);
      const profile = _.get(responseObj, 'response.data', null);
      resolve(profile);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  req.end();
});

const Authorization = (req, res, next) => {
  const { accessToken } = req.query;
  if (accessToken) {
    retrieveUserProfile(accessToken)
      .then((data) => {
        req.clientContext = {
          userProfile: data,
        }
        next();
      })
      .catch((e) => {
        console.log('error: ', e);
        next();
      });
  } else {
    next();
  }
};

export default Authorization;
