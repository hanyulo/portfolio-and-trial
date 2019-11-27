/* eslint-disable comma-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import App from './app';
import config from '../config/config';

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
};

const renderer = config.nodeEnvIsProd ? ReactDOM.hydrate : ReactDOM.render;

renderer(
  <BrowserRouter>
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>
  </BrowserRouter>, document.getElementById('root')
);
