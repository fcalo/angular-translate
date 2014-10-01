'use strict';

describe('Controller: AdminproductsCtrl', function () {

  // load the controller's module
  beforeEach(module('wwwApp'));

  var AdminproductsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminproductsCtrl = $controller('AdminproductsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
