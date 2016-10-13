var env = process.env.NODE_ENV || 'development';
var colors = require('colors/safe');

module.exports = {
  init: function(app) {
    // eslint-disable-next-line no-unused-vars
    app.use(function logErrors(err, req, res, next) {
      console.error(
        `${colors.red.underline('ErrorType')}: 500`,
        `${colors.red.underline('path')}: ${req.url}`,
        `${colors.red.underline('ErrorStack')}: ${err.stack}`
      );
      res.status(500);
      if (env !== 'production') {
        if (req.xhr) {
          res.send({ error: true, code: '500', msg: err.stack });
        } else {
          res.render('500', {
            msg: err.stack
          });
        }
      } else {
        if (req.xhr) {
          res.send({ error: true, code: '500' });
        } else {
          res.render('500');
        }
      }
    });

    // eslint-disable-next-line no-unused-vars
    app.use(function(req, res, next) {
      console.error(
        `${colors.red.underline('ErrorType')}: 404`,
        `${colors.red.underline('path')}: ${req.url}`
      );
      res.status(404);
      if (req.xhr) {
        res.send({ error: true, code: '404' });
      } else {
        res.render('404');
      }
    });
  }
};
