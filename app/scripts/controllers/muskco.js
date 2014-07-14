'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:MuskcoCtrl
 * @description
 * # MuskcoCtrl
 * Controller of the wwwApp
 */
 
angular.module('wwwApp')
  .controller('MuskcoCtrl', function ($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
	};
    $('label.tree-toggler').click(function () {
		$(this).parent().children('ul.tree').toggle(300);
	});
	
	$('#language-selector li a').click(function(){
		
		var strs = $('#language-label').html().split(' : ');
		$('#language-label').html(strs[0] + ' : ' + $(this).html() + ' ');
	});
    
    
  });
