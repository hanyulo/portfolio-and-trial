const express = require('express');
const app = express();
// const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const webpackConfig = require('./webpack.config.development');


const compiler = webpack(webpackConfig);

// so you can access /path directly from browser
app.use(historyApiFallback());

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
