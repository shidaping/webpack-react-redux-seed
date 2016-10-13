var express = require('express');
var app = express();
// 设置模板路径，默认为./views
// app.set('views', path.join('views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
require('./lib/assetsHelper').init(app);
app.get('/data/newsList', function(req, res) {
  res.json([{
    id: 2,
    title: 'news B'
  }, {
    id: 1,
    title: 'news A'
  }]);
});
app.get('/*', function(req, res) {
  res.render('index', { helloWorld: 'hello,world' });
});
app.listen(3000, function() {
  console.log('app listen at 3000');
});
