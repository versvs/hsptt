'use strict';

// Define `packList` component
angular.
  module('packList').
  component('packList', {
    templateUrl: 'app/pack-list/pack-list.template.html',
    controller: function PackListController($http) {
      var self = this;
      self.orderProp = 'id';
      $http.get('app/pack-list/pack-list.json').then(function(response) {
        self.packList = response.data;
      });
    }
  });
