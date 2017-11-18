'use strict';

// Define `packList` component
angular.
  module('packList').
  component('packList', {
    templateUrl: 'app/pack-list/pack-list.template.html',
    styleUrls: ['app/pack-list/pack-list.css'],
    controller: function PackListController($http, $scope, $rootScope) {
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
          // check & set if set has been released
          var currentDate = new Date();
          console.log("currentDate: " + currentDate);
          var releaseDate = new Date(self.packList[i].release);
          console.log("releaseDate: " + releaseDate);
          if ( releaseDate > currentDate) {
            self.packList[i].isReleased = false;
          } else {
            self.packList[i].isReleased  = true;
          }
          console.log(self.packList[i].name + ", is released? " + self.packList[i].release);
        }
      });
      // increment and reset of counters
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
      // event listening
      $rootScope.$on("searchquery:packs", function (event, data) {
        self.packFilter = data;
      });
    }
  });
