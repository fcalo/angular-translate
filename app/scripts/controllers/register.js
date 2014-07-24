'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp')
  .controller('RegisterCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
      $scope.registerUser = function(){
        //~ $http({
          //~ url:'data_dev/register.json',
          //~ }).success(function(data) {
          //~ alert(data.status);
        //~ });
        $http({
          url: 'data_dev/register.json',
          data : "ok=1",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          alert(data.status);
        }).error(function(){
            alert("Ha ocurrido algún error al realizar el registro!.");
        })
     }

    
    
  });
