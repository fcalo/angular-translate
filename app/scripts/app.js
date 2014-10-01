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
    'pascalprecht.translate',
    'ui.bootstrap',
    'angularFileUpload'
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
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/seller', {
        templateUrl: 'views/seller.html',
        controller: 'SellerCtrl'
      })
      .when('/product/:product_id', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl'
      })
      .when('/rating/:order_id', {
        templateUrl: 'views/rating.html',
        controller: 'RatingCtrl'
      })
      .when('/draw/:draw_id', {
        templateUrl: 'views/draw.html',
        controller: 'DrawCtrl'
      })
      .when('/ballots/:draw_id', {
        templateUrl: 'views/ballots.html',
        controller: 'BallotsCtrl'
      })
      .when('/category/:category_url', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/admin/users', {
        templateUrl: 'views/admin_users.html',
        controller: 'AdminusersCtrl'
      })
      .when('/admin/user/:user_id', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/admin/products', {
        templateUrl: 'views/admin_products.html',
        controller: 'AdminproductsCtrl'
      })
      .when('/admin/product/', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl'
      })
      .when('/admin/product/:product_id', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $translateProvider.useStaticFilesLoader({
	  prefix: '/languages/',
	  suffix: '.json'
	});
    
	$translateProvider.preferredLanguage('es');
	
	
}).filter('iif', function () {
   return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
   };
});

