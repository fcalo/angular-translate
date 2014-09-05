'use strict';

describe('Controller: BallotsCtrl', function () {

  // load the controller's module
  beforeEach(module('wwwApp'));

  var BallotsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BallotsCtrl = $controller('BallotsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
