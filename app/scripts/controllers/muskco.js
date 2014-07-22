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
		if (!$(this).parent().children('ul.tree').is(':visible')){
			$('label.tree-toggler').each(function(){
				if ($(this).parent().children('ul.tree').is(':visible')){
					$(this).parent().children('ul.tree').toggle(300);
				}
			});
		}
		$(this).parent().children('ul.tree').toggle(300);
		
		
	});
	
	$('#language-selector li a').click(function(){
		
		var strs = $('#language-label').html().split(' : ');
		$('#language-label').html(strs[0] + ' : ' + $(this).html() + ' ');
	});
	
  $("#btn-register").click(function(){
    $("#login-modal").modal('hide');
    window.location = "#/register"
  });
  $("#btn-reset").click(function(){
    $("#login-modal").modal('hide');
    window.location = "#/reset"
  });
  
    //~ setTimeout("$('.translate').css('visibility','visible');",500);
    
  });
