'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:RegistersellerCtrl
 * @description
 * # RegistersellerCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp')
  .controller('RegistersellerCtrl', function ($scope, $http, $filter) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.loadCountries();
    
    $scope.registerSeller = function(register){
        
        if(!$scope.register || !$scope.register.term_of_use){
          $scope.register_error = $filter('translate')("Debe aceptar los terminos de uso");
          return false;
        }
      
      
        var params = []
        var k;
        for (k in register){
          params.push(k + "=" + register[k])
        }
                
        $http({
          url: 'data_dev/register_seller.json',
          data : params.join("&"),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          if(data.status){
            $scope.register_ok = true;
          }else{
            $scope.register_error = data.error_msg;
            $scope.error = data.inputs_failed;
          }
        }).error(function(){
            alert("Ha ocurrido algún error al realizar el registro!.");
        })
     }

    
    
    
  });
