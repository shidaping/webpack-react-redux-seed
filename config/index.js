var env = process.env.NODE_ENV || 'development';
var _ = require('lodash');
var ip = require('ip');
var config = require(`./${env}`);
var packageConfig = require('../package.json');
var commonConfig = {
  port: 65100,
  devPort: 5100,
  ip: ip.address(),
  staticFilePort: 5100,
  staticFilePrefix: `/${packageConfig.name}/`
};
if (env === 'development') {
  commonConfig = _.extend(commonConfig, {
    staticFileHost: commonConfig.ip
  });
}
module.exports = _.extend(config, commonConfig);
