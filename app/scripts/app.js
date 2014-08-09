'use strict';

/**
 * @ngdoc overview
 * @name wwwApp
 * @description
 * # wwwApp
 *
 * Main module of the application.
 */
angular
  .module('wwwApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate'
  ])
  .config(function ($routeProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/seller/register', {
        templateUrl: 'views/register_seller.html',
        controller: 'RegistersellerCtrl'
      })
      .when('/reset', {
        templateUrl: 'views/reset.html',
        controller: 'ResetCtrl'
      })
      .when('/user/:user_id', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/seller/:user_id', {
        templateUrl: 'views/seller.html',
        controller: 'SellerCtrl'
      })
      .when('/category/:category_url', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $translateProvider.useStaticFilesLoader({
	  prefix: '/languages/',
	  suffix: '.json'
	});
    
	$translateProvider.preferredLanguage('es');
	
	
});

