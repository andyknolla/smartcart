'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.login = function() {
      alert('You\'ll need to log in to save receipts.');
    }
  }
]);
