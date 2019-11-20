import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import App from '../../app';


const serverRenderer = (req, res, next) => {
  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()));
  const indexHtmlPath = path.resolve(__dirname, './template.html');
  const context = {};
  const clientApp = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <StyleContext.Provider value={{ insertCss }}>
        <App />
      </StyleContext.Provider>
    </StaticRouter>
  );

  fs.readFile(indexHtmlPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('System Error!!');
    }
    let newData = data.replace('<div id="root"></div>', `<div id="root">${clientApp}</div>`);
    newData = newData.replace('<!-- insert style here on ssr -->', `<style>${[...css].join('')}</style>`);
    return res.send(newData);
  });
};

export default serverRenderer;
