'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp')
  .controller('UserCtrl', function ($scope, $routeParams, $http, $compile, $filter) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'ngAnimate'
    ];
    
    $scope.loadCountries();
    
    $http({
      url: 'data_dev/getUser.json',
      data : "id_user=" + $routeParams.user_id,
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
        
        //lotto
        var rewarded = {0: "No premiada",
                      1: "Premiada"};
        var rewarded_label = {0: "warning",
                      1: "success"};
                      
        $scope.expand_dir = {};
        $scope.expand_label = {};
        for (i in data['lotto_data']){
          var lotto = data['lotto_data'][i];
          var html = "<tr><td>" + lotto['id_lotto'] +"</td>";
          html += "<td>" + lotto['equipment'] +"</td>";
          html += "<td>" + lotto['date'] +"</td>";
          var participations = lotto['participations']
          var multiple = participations.length > 1
          var p
          var html_participations = "<td class='text-center'>"
          var html_labels = "<td>"
          
          var first = true;
          for (p in participations){
            var participation = participations[p];
            if (multiple && first){
              html_participations += '<div  class="text-center ' + lotto['id_lotto'] + '">';
              html_labels += '<div class="' + lotto['id_lotto'] + '">';
            }
            if (!first){
              html_participations += "<span>"
            }
            html_participations += participation["number"]
            html_labels += '<span class="label label-' + rewarded_label[participation["rewarded"]] + '">' + rewarded[participation["rewarded"]] + '</span>';
            if (!first){
              html_participations += "</span>"
            }
            
            first = false
          }
          if (multiple){
              html_participations += '</div>';
              html_labels += '</div>';
          }
          html_participations += "</td>";
          html_labels += "</td>";
          html += html_participations;
          if (multiple){
            $scope.expand_dir[lotto['id_lotto']] = "down";
            $scope.expand_label[lotto['id_lotto']] = $filter("translate")("Ver Todas");
            html += '<td><a class="text-center" \
              ng-click="expand_lotto(\'' + lotto['id_lotto']  + '\')" \
              ng-data="expand_label"> {{ expand_label[\'' + lotto['id_lotto'] + '\'] }} \
              <span class="glyphicon \
              glyphicon-chevron-{{ expand_dir[\'' + lotto['id_lotto'] + '\'] }}"></span> </a></td>';
              
          }else{
            html += "<td></td>";
          }
          html += html_labels;
            //~ html += "<td><span class='label label-" + rewarded_label[participation['rewarded']] + "'>";
            //~ html += rewarded[participation['rewarded']] + "</span></td>";
          //~ }
          
          
          var element=$("#lotto-body");
          element.append($compile(html)(element.scope()));
        }
        
            
        
        
        //orders
        var status = {0: "Pendiente",
                      1: "Enviado",
                      2: "Entregado"};
        var status_label = {0: "warning",
                      1: "info",
                      2: "success"};
                      
        for (i in data['order_data']){
          var order = data['order_data'][i];
          var html = "<tr><td>" + order['reference'] +"</td>";
          html += "<td>" + order['equipment'] + "/" + order['id_lotto'] + "</td>";
          html += "<td>" + order['date'] +"</td><td>";
          html += order['price'] +" </td><td>";
          html += "<span class='label label-" + status_label[order['status']] + "'>";
          html += status[order['status']] + "</span></td>";
          html += "<td class='text-center'>"; 
          if (order['status'] == 2){
            html += "<a href= '#/rating/" + order['reference'] + "'><span class='glyphicon glyphicon-star'></span></a>";
          }
          html += "</span></td></tr>";
          $("#order-body").append(html);
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
    
    // lotto
    $scope.expand_label="Ver Todas";
    $scope.expand_dir="down";
    $scope.expand_lotto = function(id_lotto){
      var obj = $("#lotto table div." + id_lotto);
      if (obj.length){
        if (obj.is(":visible")){
          $("#lotto table div." + id_lotto).fadeOut();
          
          $scope.expand_label[id_lotto]="Ver todas";
          $scope.expand_dir[id_lotto]="down";
        }else{
          $scope.expand_label[id_lotto]="Ocultar";
          $scope.expand_dir[id_lotto]="up";
          $("#lotto table div." + id_lotto).fadeIn();
        }
      }
    }
    
    //~ 
    
    $('#user-tab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
      $(".tab-pane").hide();
      $("#" + $(this).attr("href")).fadeIn();
    })
    
    
  });
