import React, { useState } from 'react';
import styles from './UrlShortener.scss';
import config from '../../config/config';

const apiDev = 'http://localhost:8080';
const apiProduct = 'https://url-shortener-back.appspot.com';
const apiOrigin = config.nodeEnvIsProd ? apiProduct : apiDev;


const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const onInputChange = (e) => {
    setUrl(e.target.value);
  };
  const submitHandler = async () => {
    const originalUrl = url;
    const postData = async (obj) => {
      const response = await fetch(`${apiOrigin}/api/shorturl/new`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      return data;
    };
    const data = await postData({ originalUrl });
    console.log(data);
  };
  return (
    <div className={styles.container}>
      <h1>url shortener</h1>
      <div className={styles.inputPanel}>
        <input
          type="text"
          className={styles.input}
          onChange={onInputChange}
        />
        <input
          type="submit"
          value="Submit"
          className={styles.button}
          onClick={submitHandler}
        />
      </div>
    </div>
  );
};

export default UrlShortener;
