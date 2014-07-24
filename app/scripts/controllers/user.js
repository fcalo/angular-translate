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
      'Karma'
    ];
    
    //~ $routeParams.user_id
    
    $('#user-tab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
      $(".tab-pane").hide();
      $("#" + $(this).attr("href")).fadeIn();
    })
    
    $("#address_match").click(function(){
      if ($("#address_match").prop("checked"))
        $("#panel_address_shipping").fadeIn();
      else
        $("#panel_address_shipping").fadeOut();
    });
    
  });
