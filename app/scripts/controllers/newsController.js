
angular.module('CurrencyEx')
  .controller('NewsController',['$scope','$http','$state','$news', function($scope,$http,$state, $news) {
        $scope.entries = [];
        //$http call for making a server side call to google api services for getting news feed on market related topics
        $http.get('/feeds')
            .then(function (response) {
                $scope.entries = response.data.query.results.item;
            }, function (error) {
                console.log('Error: ' + error);
            });
        //decorating the scope with a service to access the $news factory modal instance
        $scope.service = $news;
        $scope.feeds = function () {
            FeedLoader.fetch({q: ''})
        }
    }]);
