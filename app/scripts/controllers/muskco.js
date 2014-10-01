'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:MuskcoCtrl
 * @description
 * # MuskcoCtrl
 * Controller of the wwwApp
 */
 
angular.module('wwwApp')
  .controller('MuskcoCtrl', function ($translate, $scope, $http, $filter) {
	
    $scope.production = true;
	  
    $scope.lang_selected = "ES";
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      $scope.lang_selected = langKey.toUpperCase();
    }
    
    
    //html 2 json(patch)
    $scope.table2object = function(tableHtml){
      $("#comunicate").html(tableHtml);
      var cols = [];
      var result = [];
      $('#comunicate table th').each(function(){
          cols.push($(this).text().toLowerCase());
      });
      $('#comunicate table tr').each(function(id){
          if ($(this).find('td').length>0){
            var row = {};
            $(this).find('td').each(function(index){
                row[cols[index]] = $(this).text();
            });
            result.push(row);
          }
      });
      if (result.length == 1)
        return result[0];
      else
        return result;
    }
    
    //load categories
    $http({
      url: 'data_dev/categories.json'
    }).success(function(categories){
      $("#left-categories").html("");
      $("#menu-categories ul").html("");
      var key;
      $scope.categories = categories; 
      $scope.subcategories = {}; 
      for (key in categories){
        var category = categories[key];
        
        
        var has_subcategories = category["subcategories"].length>0;
          
        if (has_subcategories){
          $("#left-categories").append('<li id="c' + category['id'] + '"><label class="tree-toggler nav-header">' + category['title'] + '</label></li>');
          $("#menu-categories ul.dropdown-menu-primary").append('<li class="dropdown-submenu" id="c_m' + category['id'] + '"><a href="#/category/' + category['friendly_url'] + '">' + category['title'] + '</a></li>');
        }else{
          $("#left-categories").append('<li id="c' + category['id'] + '"><label class="tree-toggler nav-header"><a class="category-label" href="#/category/' + category['friendly_url'] + '">' + category['title'] + '</a></label></li>');
          $("#menu-categories ul.dropdown-menu-primary").append('<li id="c_m' + category['id'] + '"><a href="#/category/' + category['friendly_url'] + '">' + category['title'] + '</a></li>');
        }
        
        var keySubcategory;
        
        if (has_subcategories){
          $("#left-categories #c" + category['id']).append('<ul class="nav nav-list tree"></ul>');
          $("#menu-categories ul.dropdown-menu-primary #c_m" + category['id']).append('<ul class="dropdown-menu"></ul>');
        }
        $scope.subcategories[category['id']] = category["subcategories"];
        for (keySubcategory in category["subcategories"]){
            var subcategory = category["subcategories"][keySubcategory];
            $("#left-categories #c" + category['id']+ " ul").append('<li><a href="#/category/' + subcategory['friendly_url'] + '">' + subcategory['title'] + '</a></li>');
            $("#menu-categories ul #c_m" + category['id']+ " ul").append('<li><a href="#/category/' + subcategory['friendly_url'] + '">' + subcategory['title'] + '</a></li>');
        }
        
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
    });
    
    $scope.login = function(user){
      $scope.error_login = null;
      $scope.login_ok = null;
      $("#username").parent().parent().removeClass("has-error");
      $("#password").parent().parent().removeClass("has-error");
      if (!user || !user.username){
        $("#username").parent().parent().addClass("has-error");
        //~ {{ 'Usuario no valido' | "translate" }};
        $scope.error_login = $filter("translate")('Usuario no valido');
        return false;
      }
      if (!user.password){
        $("#password").parent().parent().addClass("has-error");
        //~ {{ 'Contraseña no valida' | "translate" }};
        $scope.error_login = $filter("translate")('Contraseña no valida');
        return false;
      }
      $("#username").parent().parent().removeClass("has-error");
      $("#password").parent().parent().removeClass("has-error");
      $http({
        url: $scope.production ? '../LoginUserPassword':'data_dev/login.html',
        params : {"username" : user.username , "password" : user.password}
      }).success(function(data_html){
        var data = $scope.table2object(data_html);
        console.log(data);
        if (data.status){
          
          //~ $scope.user_type = data['is_seller'] ? "seller" : "user";
          $scope.user_type = "user";
          $scope.login_ok = true
          $scope.user_login = data;
          setTimeout("$('#login-modal').modal('hide');",500);
        }
        else{
          $scope.error_login = $filter("translate")('Algún dato no es correcto');
        }
      }).error(function(){
          //~ $scope.error_login = $translate('Error de comunicación');
          //~ {{ 'Error de comunicación' | translate }}
          $scope.error_login = $filter("translate")('Error de comunicación');
      })
    }
    
    $scope.logout = function(){
      
      $http({
        url: $scope.production ? 'Logout':'data_dev/logout.json'
      }).success(function(data){
        if (data.status){
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
    
    $scope.loadCountries = function(){
      $http({
        url: 'data_dev/countries.json'
      }).success(function(data){
         $scope.countries = data;
      });
    }
    
    $scope.provinces = []
    function _loadProvinces(id_country, index){
      $http({
        url: 'data_dev/provinces.json',
        params:{"id_country":id_country}
      }).success(function(data){
        $scope.provinces[index] = data;
      });
    }
    $scope.loadProvinces = function(id_country){
      return _loadProvinces(id_country, 0);
    }
    $scope.loadProvinces2 = function(id_country){
      return _loadProvinces(id_country, 1);
    }
      
    $scope.cities = []
    function _loadCities(id_province, index){
      $http({
        url: 'data_dev/cities.json',
        params:{"id_province":id_province}
      }).success(function(data){
        $scope.cities[index] = data;
      });
    }
    $scope.loadCities = function(id_province){
      return _loadCities(id_province, 0);
    }
    $scope.loadCities2 = function(id_province){
      return _loadCities(id_province, 1);
    }
    
    $scope.short_lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus elit sit amet neque facilisis gravida. ";
    $scope.lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus elit sit amet neque facilisis gravida. Nunc nunc dolor, viverra quis congue vel, placerat eu est. Vestibulum magna turpis, sodales sit amet mi vitae, elementum ullamcorper leo. Aliquam erat volutpat. Sed blandit enim ut quam convallis posuere. Vivamus magna dolor, congue euismod blandit quis, sagittis ut dui. Ut id est lacus. Vivamus molestie porttitor ornare.";
    
    $scope.back = function() {
      window.history.back();
    };
    
	
	
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
