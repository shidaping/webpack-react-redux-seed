var config = require('../config');
var qiniu = require('qiniu');
var uuid = require('node-uuid');
var configQiniu = config.qiniu;

var helper = {
  init: function() {
    qiniu.conf.ACCESS_KEY = configQiniu.access_key;
    qiniu.conf.SECRET_KEY = configQiniu.secret_key;
  },
  uptoken: function(bucketname) {
    var putPolicy = new qiniu.rs.PutPolicy(bucketname);
    // putPolicy.callbackUrl = callbackUrl;
    // putPolicy.callbackBody = callbackBody;
    // putPolicy.returnUrl = returnUrl;
    // putPolicy.returnBody = returnBody;
    // putPolicy.asyncOps = asyncO
    // putPolicy.expires = expires;ps;

    return putPolicy.token();
  },
  generateKey: function() {
    return uuid.v4();
  }
};

module.exports = helper;
