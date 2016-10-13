var env = process.env.NODE_ENV || 'development';
var config = require('../config');
var manifest = require('../manifest.json');
var helpers = {
  script: function(file) {
    var scriptStr;
    var manifestFile = manifest[file];
    var realFile = manifestFile;
    if (env === 'development') {
      scriptStr = `<script src="http://${config.ip}:${config.staticFilePort}${config.staticFilePrefix}${file}.js"></script>`;
    } else {
      if (manifestFile instanceof Array) {
        realFile = manifestFile[0];
      }
      scriptStr = `<script src="http://${config.ip}:${config.staticFilePort}${config.staticFilePrefix}${realFile}"></script>`;
    }

    return scriptStr;
  },

  css: function(file) {
    var linkStr;
    var manifestFile = manifest[file];
    var realFile = manifestFile;
    if (env === 'development') {
      linkStr = `<link rel="stylesheet" href="http://${config.ip}:${config.staticFilePort}${config.staticFilePrefix}${file}.css">`;
    } else {
      if (manifestFile instanceof Array) {
        realFile = manifestFile[1];
      }
      linkStr = `<link rel="stylesheet" href="http://${config.ip}:${config.staticFilePort}${config.staticFilePrefix}${realFile}">`;
    }
    return linkStr;
  }
};

module.exports = {
  init: function(app) {
    var myapp = app;
    Object.keys(helpers).forEach(function(key) {
      myapp.locals[key] = helpers[key];
    });
  }
};
