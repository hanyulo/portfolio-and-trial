import config from '../../config/config';

const createOriginalUrl = () => {
  const elem = document.getElementById('originalUrl');
  const originalUrl = elem.value;
  const postData = async (obj) => {
    const response = await fetch(config.apiOrigin, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(obj)
    });
    return response.json();
  };
  const data = postData({ originalUrl });
  console.log('data: ', data);
};

// module.exports = createOriginalUrl;
