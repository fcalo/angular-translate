'use strict';

describe('Controller: RegistersellerCtrl', function () {

  // load the controller's module
  beforeEach(module('wwwApp'));

  var RegistersellerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistersellerCtrl = $controller('RegistersellerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
