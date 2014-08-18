'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:DrawCtrl
 * @description
 * # DrawCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp')
  .controller('DrawCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var c;
    var image;
    for (c in [1, 2, 3]){
      var carousel = (c * 1.0) + 1;
      var index = Math.floor((Math.random() *10))
      for (image in [1, 2, 3, 4, 5, 6, 7, 8, 9]){
        $("#carousel" + carousel).append('<img src="images/' + index + '.jpg" alt="' + index + '" />');
        index = (index + 1) % 10;
      }
    }
    
    var i;
    
    
    for (i in [1, 2, 3]){
      $( "#carousel" + (i*1.0 +1) ).rcarousel({
        speed: 500,
        visible:1,
        width:46,
        height:71,
        step: 1,
        orientation: "vertival",
        auto:{
          enabled:true,
          direction: i % 2 ? "next" : "prev",
          interval:500
        }
      });
    }
    
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
