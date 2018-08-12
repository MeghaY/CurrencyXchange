
var nconf = require('nconf'),
  request = require('request'),
  q = require('q'),
  log = require('winston');

exports.feeds = function(req,res){
  var yql = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Frss.news.yahoo.com%2Frss%2Ftopstories%22&format=json&callback=";
  var deferred = q.defer();
    // Using request module for creating a get request
  request.get({
    url: yql,
    headers: {
      'Content-type':'application/json'
    }
  }, function(err, resp, body) {
      if(body){
          deferred.resolve(body);
           }
      else {
          deferred.reject(err);
      }
    return deferred.promise
    .then(function(response) {
      res.send(201, response);
    },function(error){
      res.send(500, {message: 'An error occurred while receiving feeds.', error: error});
    });
  });
};

