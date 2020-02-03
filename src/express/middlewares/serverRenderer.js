import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import fs from 'fs';
import path from 'path';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import App from '../../app';


const serverRenderer = (req, res, next) => {
  // server side scss
  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()));
  const indexHtmlPath = path.resolve(__dirname, './template.html');
  // server side styled Component
  const sheet = new ServerStyleSheet();
  // react router
  const context = {};
  try {
    const styledApp = (
      <StaticRouter
        location={req.url}
        context={context}
      >
        <StyleSheetManager sheet={sheet.instance}>
          <StyleContext.Provider value={{ insertCss }}>
            <App />
          </StyleContext.Provider>
        </StyleSheetManager>
      </StaticRouter>
    );
    const clientApp = ReactDOMServer.renderToString(styledApp);
    const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
    fs.readFile(indexHtmlPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('System Error!!');
      }
      let newData = data.replace('<div id="root"></div>', `<div id="root">${clientApp}</div>`);
      newData = newData.replace('<!-- insert style here on ssr -->', `<style>${[...css].join('')}</style>`);
      newData = newData.replace('<!-- insert styled component here on ssr -->', styleTags);
      return res.send(newData);
    });
  } catch (error) {
    // handle error
    console.error(error);
  } finally {
    sheet.seal();
  }
};

export default serverRenderer;
