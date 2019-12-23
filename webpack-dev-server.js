const express = require('express');
const app = express();
// const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const webpackConfig = require('./webpack.config.development');
// const Authorization = require('./dev-dist/authorization.js').default;
// const serverRenderer = require('./dev-dist/serverRenderer.js').default;

const compiler = webpack(webpackConfig);

// so you can access /path directly from browser
app.use(historyApiFallback());

// app.use(Authorization);

// option -> writeToDisk: true, can exam files in the dist folder
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

const thePort = process.env.PORT || 3000;
app.listen(thePort, () => {
  console.log(`the sever is running on port: ${thePort}`);
});
