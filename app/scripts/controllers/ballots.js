'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:BallotsCtrl
 * @description
 * # BallotsCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp')
  .controller('BallotsCtrl', function ($scope, $compile) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.ballotSelected = function(id_ballot){
      if (!$("#" + id_ballot).hasClass("assigned"))
        var element=$("#" + id_ballot);
        element.addClass("selected");
        //~ element.attr("tooltip", "selected");
        //~ $compile(element)($scope);
        
    }
    
    $scope.randomAssigned = function(){
      //Random para pruebas
      
      var _id = "ballot_" + Math.floor((Math.random() * 200) + 401);
      $("#"+ _id).addClass("assigned");
      //~ element.attr("tooltip", "comprada");
      //~ $compile(element)($scope);
        
    }
    
    $scope.r=0;
    
    var IMAGE_WIDTH = 405;
    
    $scope.scrollTo = function(image,ind) {
        $scope.listposition = {left:(IMAGE_WIDTH * ind * -1) + "px"};
        $scope.selected = image;
    }
    
  }).directive('fancybox',function($compile, $timeout){
    return {
        link: function($scope, element, attrs) {
            element.fancybox({
                openeffect: "elastic",
                onComplete: function(){
                    $timeout(function(){
                        $compile($("#fancybox-content"))($scope);
                        $scope.$apply();
                        $.fancybox.resize();
                    })
                }
            });
        }
    }
});
