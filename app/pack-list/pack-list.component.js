'use strict';

// Define `packList` component
angular.
  module('packList').
  component('packList', {
    templateUrl: 'app/pack-list/pack-list.template.html',
    styleUrls: ['app/pack-list/pack-list.css'],
    controller: function PackListController($http, $scope) {
      var self = this;
      self.orderProp = 'id';
      $http.get('app/pack-list/pack-list.json').then(function(response) {
        // load the JSON into the current scope
        self.packList = response.data;
        console.debug("localStorage: " + localStorage.getItem(self.packList[0].name));
        for (var i = 0; i < self.packList.length; i++) {
          // check if localStorage values for `counter` exists
          // and uses this value instead of the default in JSON (zero)
          if (localStorage.getItem(self.packList[i].name)) {
            self.packList[i].counter = parseInt(localStorage.getItem(self.packList[i].name));
            console.log("Type of stored counter: " + typeof self.packList[i].name);
            console.log("iterating thru packList");
          };
          // add `even` or `odd` element to elements in packList, to ease the styling
          if (self.packList[i].id % 2) {
            self.packList[i].oddity = "odd";
          } else {
            self.packList[i].oddity = "even";
          }

        }
      });
      $scope.increment = function(pack) {
        pack.counter += 1;
        console.log("Pack Number Incremented");
        localStorage.setItem(pack.name, pack.counter);
        console.log(pack.name + '=', pack.counter);
      }
      $scope.legendary = function(pack) {
        pack.counter = 0;
        console.log("Pack Number Reset after legendary card found, greetings!");
        localStorage.setItem(pack.name, pack.counter);
        console.log(pack.name + '=', pack.counter);
      }
    }
  });
