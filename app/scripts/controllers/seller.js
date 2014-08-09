'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:SellerCtrl
 * @description
 * # SellerCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp')
  .controller('SellerCtrl', function ($scope, $routeParams, $http, $compile) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'ngAnimate'
    ];
    
    $scope.loadCountries();
    
    $http({
      url: 'data_dev/getUser.json',
      data : "seller=1&id_user=" + $routeParams.user_id,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      if (data.status){
        $scope.user= data['user_data']
        
        $scope.loadProvinces(data['user_data']['country']);
        $scope.loadCities(data['user_data']['province']);
        
        $scope.loadProvinces2(data['user_data']['country_shipping']);
        $scope.loadCities2(data['user_data']['province_shipping']);
        
        var address_fields = ["address", "number", "stair", "floor", 
          "letter", "postal_code", "country", "province", "city"]
        
        var f;
        for (f in address_fields){
          var field = address_fields[f];
          if ($scope.user[field] != $scope.user[field + "_shipping"]){
            //use another email adress
            $scope.address_match = true;
            break;
          }
        }
        
        
        //fiscal
        var i;
        for (i in data['fiscal_data']){
          var fiscal = data['fiscal_data'][i];
          var html = "<tr><td>" + fiscal['concept'] +"</td>";
          html += "<td>" + fiscal['date'] +"</td><td>";
          html += fiscal['amount'] +" </td><td>";
          html += fiscal['balance'] +"</td></tr>";
          $("#fiscal-body").append(html);
        }
        
        
        //lotto_seller
                //lotto
        var status = {0: "{{ 'No celebrado' | translate }}",
                      1: "{{ 'Celebrado' | translate }}"};
        var status_label = {0: "info",
                      1: "success"};
        var i;
        $scope.detail = {}
        for (i in data['lotto_seller_data']){
          var lotto = data['lotto_seller_data'][i];
          var html = "<tr><td>" + lotto['equipment'] +"</td>";
          html += "<td>" + lotto['id_lotto'] +"</td>";
          html += "<td>" + lotto['date'] +"</td>";
          html += "<td>" + lotto['ballots'] +" </td>";
          html += "<td>" + lotto['sold'] +"</td>";
          html += '<td><span class="label label-' + status_label[lotto["status"]] + '">' + status[lotto["status"]] + '</span></td>';
          html += '<td class="text-center"><a data-toggle="modal" data-target="#detail-modal" ng-click="openDetail(\'' + lotto["id_lotto"] + '\')"><span class="glyphicon glyphicon-time"></span></a></td>';
          html += '<td class="text-center"><a href="#"><span class="glyphicon glyphicon-eye-open"></span></a></td></tr>';
          
          $scope.detail[lotto["id_lotto"]]=lotto;
          
          var element=$("#lotto-seller-body");
          element.append($compile(html)(element.scope()));
        }
        
        
            
      }else{
        window.location = '/';
      }
      
      
    }).error(function(){
        alert("Error de conexión!.");
    })
    
    
    // unsuscribe
    $scope.unsuscribeUser = function(){
      $http({
        url: 'data_dev/unsuscribeUser.json',
        data : "id_user=" + $routeParams.user_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data){
        if(data.status){
          $scope.unsuscribe_ok = true;
          $scope.logout();
          setTimeout("window.location = '/'",1500);
        }else{
          $scope.unsuscribe_error = data.error_msg;
        }
      }).error(function(){
          alert("Ha ocurrido algún error al realizar el registro!.");
      })
    }
    
    //save User
    $scope.saveUser = function(user){
      
      var params = []
      var k;
      for (k in user){
        params.push(k + "=" + user[k])
      }
      
      $http({
        url: 'data_dev/saveUser.json',
        data : params.join("&"),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data){
        if(data.status){
          $scope.save_ok = true;
        }else{
          $scope.save_error = data.error_msg;
          $scope.error = data.inputs_failed;
        }
      }).error(function(){
          alert("Ha ocurrido algún error al realizar el registro!.");
      })
    }
    
    $scope.openDetail = function(id){
      $scope.detail_ballots = $scope.detail[id]['ballots'];
      $scope.detail_sold = $scope.detail[id]['sold'];
      $scope.detail_per_reserved = $scope.detail[id]['per_reserved'];
      $scope.detail_price = $scope.detail[id]['price'];
    }
    //~ 
    
    $('#user-tab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
      $(".tab-pane").hide();
      $("#" + $(this).attr("href")).fadeIn();
    })
    
    
  });
