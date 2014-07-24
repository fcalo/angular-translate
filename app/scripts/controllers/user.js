'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp')
  .controller('UserCtrl', function ($scope, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'ngAnimate'
    ];
    
    
    $scope.expand_label="Ver Todas";
    $scope.expand_dir="down";
    $scope.expand_lotto = function(){
      var obj = $("#lotto table div");
      if (obj.is(":visible")){
        $("#lotto table div").fadeOut();
        $scope.expand_label="Ver todas";
        $scope.expand_dir="down";
      }else{
        $scope.expand_label="Ocultar";
        $scope.expand_dir="up";
        $("#lotto table div").fadeIn();
      }
    }
    
    //~ $routeParams.user_id
    
    $('#user-tab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
      $(".tab-pane").hide();
      $("#" + $(this).attr("href")).fadeIn();
    })
    
    
  });
