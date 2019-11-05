const express = require('express');
const app = express();
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

// app.use(express.static(path.resolve(__dirname, './public')));

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './views/index.html'));
// });

const thePort = process.env.PORT || 3000;
app.listen(thePort, () => {
  console.log(`the sever is running on port: ${thePort}`);
});
