const config = require('./config/config');

const webpackConfig = require(`./webpack.config.${config.nodeENV}.js`);

module.exports = webpackConfig;
