'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp')
  .controller('RegisterCtrl', function ($scope, $http, $filter) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
      $scope.loadCountries();
    
      $scope.registerUser = function(register){
        //~ $http({
          //~ url:'data_dev/register.json',
          //~ }).success(function(data) {
          //~ alert(data.status);
        //~ });
        
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
          url: $scope.production ? 'AltaUserDatPers':'data_dev/register.json',
          data : params.join("&"),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          if(data.status){
            $scope.register_ok = true;
          }else{
            $scope.register_error = data.error_msg;
            $scope.error = data.inputs_failed;
            //~ for (input in data.inputs_failed){
              //~ $("#" + data.inputs_failed[input]).parent().parent().addClass("has-error");
            //~ }
          }
        }).error(function(){
            alert("Ha ocurrido algún error al realizar el registro!.");
        })
     }

    
    
  });
