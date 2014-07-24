'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:MuskcoCtrl
 * @description
 * # MuskcoCtrl
 * Controller of the wwwApp
 */
 
angular.module('wwwApp')
  .controller('MuskcoCtrl', function ($translate, $scope, $http) {
	
	  
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    }
    $scope.login = function(user){
      $scope.error_login = null;
      $scope.login_ok = null;
      $("#username").parent().parent().removeClass("has-error");
      $("#password").parent().parent().removeClass("has-error");
      if (!user || !user.username){
        $("#username").parent().parent().addClass("has-error");
        //~ $scope.error_login = $translate('Usuario no valido');
        $scope.error_login = 'Usuario no valido';
        return false;
      }
      if (!user.password){
        $("#password").parent().parent().addClass("has-error");
        //~ $scope.error_login = $translate('Contraseña no valida');
        $scope.error_login = 'Contraseña no valida';
        return false;
      }
      $("#username").parent().parent().removeClass("has-error");
      $("#password").parent().parent().removeClass("has-error");
    
      $http({
        url: 'data_dev/login.json',
        data : "username=" + user.username +"&password=" + user.password
      }).success(function(data){
        if (data.status=="ok"){
          $scope.login_ok = true
          $scope.user_login = data;
          setTimeout("$('#login-modal').modal('hide');",500);
        }
        else{
          $scope.error_login = data.error_msg;
        }
      }).error(function(){
          //~ $scope.error_login = $translate('Error de comunicación');
          $scope.error_login = 'Error de comunicación';
      })
    }
    
    $scope.logout = function(user){
      
      $http({
        url: 'data_dev/logout.json'
      }).success(function(data){
        if (data.status=="ok"){
          $scope.login_ok = null;
          $scope.user_login = null;
          $scope.user.username="";
          $scope.user.password="";
        }
        else{
          alert(data.error_msg);
        }
      });
    }
    
	
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
