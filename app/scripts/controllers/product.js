'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp')
  .controller('ProductCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
