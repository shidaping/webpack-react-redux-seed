let $ = require('jquery');
export function ajaxGetNewsList(requestData) {
  let defer = Promise.defer();
  $.ajax({
    method: 'GET',
    url: '/data/newsList',
    data: requestData,
    success: function(data) {
      defer.resolve(data);
    },
    error: function(err) {
      defer.reject(err);
    }
  });
  return defer.promise;
}

