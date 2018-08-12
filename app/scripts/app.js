'use strict';

/**
 *
 * Main module of the application.
 */
angular
  .module('CurrencyEx', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'ModalService'
  ])
    //Routing
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('exchange', {
        url: '/exchange',
        templateUrl: 'views/exchange.html',
        controller: 'ExchangeController',
        authenticate: false
      })
    .state('news', {
      url: '/news',
      templateUrl: 'views/news.html',
      controller: 'NewsController',
      authenticate: false
    });
        //default route
    $urlRouterProvider.otherwise('/exchange');
  });
