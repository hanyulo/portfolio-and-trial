import React from 'react';
import { create } from 'react-test-renderer';
import { render, fireEvent, waitForElement } from '@testing-library/react'
import UrlShortener from '../components/UrlShortener';
import { createShortUrl } from '../utils/api';

jest.mock('../utils/api');
createShortUrl
  .mockImplementationOnce(async () => {
    const res = await Promise.resolve({
      data: {
        shortenUrl: 'test-shorten-url',
      },
    });
    return res;
  })
  .mockImplementationOnce(async () => {
    const res = await Promise.resolve({
      error: new Error('this is error testing obj'),
    });
    return res;
  });

describe('<UrlShortener />', () => {
  it('snapshot check', () => {
    const root = create(<UrlShortener />);
    expect(root.toJSON()).toMatchSnapshot();
  });

  it('should be successful scenario result after click', async () => {
    const { getByTestId } = render(<UrlShortener />);
    const button = getByTestId('urlShortener-button');
    fireEvent.click(button);
    const resultDiv = await waitForElement(() => getByTestId('urlShortener-result'));
    expect(resultDiv.textContent).toBe('test-shorten-url');
  });

  it('should be fail scenario result after click', async () => {
    const { getByTestId } = render(<UrlShortener />);
    const button = getByTestId('urlShortener-button');
    fireEvent.click(button);
    const resultDiv = await waitForElement(() => getByTestId('urlShortener-error'));
    expect(resultDiv.textContent).toBe('There is something wrong with the system');
  });
});

/*
  react-testing-library: support react hook
  https://testing-library.com/docs/react-testing-library/example-intro
  https://github.com/testing-library/react-testing-library/issues/379
*/
