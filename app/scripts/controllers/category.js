'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp')
  .controller('CategoryCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
