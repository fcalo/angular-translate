'use strict';

describe('Controller: AdminuserCtrl', function () {

  // load the controller's module
  beforeEach(module('wwwApp'));

  var AdminuserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminuserCtrl = $controller('AdminuserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
