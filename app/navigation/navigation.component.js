'use strict';

// Define `nav` component
angular.
  module('navigation').
  component('navigation', {
    templateUrl: 'app/navigation/navigation.template.html',
    styleUrls: ['app/navigation/navigation.css'],
    controller: function NavigationController($scope, $rootScope) {
      $scope.filterPacks = function(model) {
        model;
        $rootScope.$emit("searchquery:packs", model);
      };
    }
  });
