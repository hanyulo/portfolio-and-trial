import React, { useState } from 'react';
import styled from 'styled-components';
// import styles from './UrlShortener.scss';
import { createShortUrl } from '../utils/api';


const ErrorComponent = styled.div`
  margin: 30px 0;
  color: #D8000C;
  font-size: 14px;
`;

const ResultContainer = styled.div`
  margin: 30px 0;
  font-size: 18px;
`;

const ResultContent = styled.div`
  margin-top: 10px;
  background-color: #f2f2f2;
  padding: 6px 8px;
  margin-left: 10px;
  display : inline-block;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 30px auto 30px auto;
`;

const InputPanel = styled.div`
  margin: 30px 0;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #333;
  display: block;
  width: 100%;
  outline: none;
  margin: 10px 0 30px 0;
  padding: 5px;
  font-size: 16px;
`;

const Button = styled.input`
  display: block;
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 130px;
  padding: 10px 12px;
  background-color: #333;
  color: #FFD700;
  font-size: 20px;
  cursor: pointer;
  outline: none;
`;


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
    <ErrorComponent
      data-testid="urlShortener-error"
    >
      There is something wrong with the system
    </ErrorComponent>
  );

  const ResultNote = shortenUrl && (
    <ResultContainer>
      <span>shorten url: </span>
      <ResultContent
        data-testid="urlShortener-result"
      >
        {shortenUrl}
      </ResultContent>
    </ResultContainer>
  );

  return (
    <Container>
      <h1>url shortener</h1>
      <InputPanel>
        <Input
          type="text"
          onChange={onInputChange}
          placeholder="original URL"
        />
        <Button
          type="submit"
          value="Submit"
          onClick={submitHandler}
          data-testid="urlShortener-button"
        />
      </InputPanel>
      {Error}
      {ResultNote}
    </Container>
  );
};

export default UrlShortener;
