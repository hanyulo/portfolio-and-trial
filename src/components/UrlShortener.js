import React, { useState } from 'react';
import styles from './UrlShortener.scss';
import { createShortUrl } from '../utils/api';
import withStyles from 'isomorphic-style-loader/withStyles';


const UrlShortener = () => {
  const [errorState, setError] = useState(false);
  const [shortenUrl, setShortenUrl] = useState(undefined);
  const [url, setUrl] = useState('');
  const onInputChange = (e) => {
    setUrl(e.target.value);
  };
  const submitHandler = async () => {
    const originalUrl = url;
    const result = await createShortUrl({ originalUrl });
    if (result.error) {
      setError(true);
    } else {
      setShortenUrl(result.data.shortenUrl);
    }
  };

  const Error = errorState && (
    <div
      className={`${styles.error} ${styles.response}`}
      data-testid="urlShortener-error"
    >
      There is something wrong with the system
    </div>
  );

  const ResultNote = shortenUrl && (
    <div className={`${styles.result} ${styles.response}`}>
      <span>shorten url: </span>
      <div
        className={styles.shortenUrl}
        data-testid="urlShortener-result"
      >
        {shortenUrl}
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1>url shortener</h1>
      <div className={styles.inputPanel}>
        <input
          type="text"
          className={styles.input}
          onChange={onInputChange}
          placeholder="original URL"
        />
        <input
          type="submit"
          value="Submit"
          className={styles.button}
          onClick={submitHandler}
          data-testid="urlShortener-button"
        />
      </div>
      {Error}
      {ResultNote}
    </div>
  );
};

export default withStyles(styles)(UrlShortener);
