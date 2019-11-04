
const config = require('./config/config');

module.exports = () => {
  return require(`./webpack.config.${config.nodeENv}.js`)
}
