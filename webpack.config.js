const config = require('./config/config');
const webpackConfig = (() => {
  return require(`./webpack.config.${config.nodeENV}.js`);
})();

module.exports = webpackConfig;
