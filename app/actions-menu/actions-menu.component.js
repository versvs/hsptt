'use strict';

// Define `ActionsMenu` component
angular.
  module('actionsMenu').
  component('actionsMenu', {
    templateUrl: 'app/actions-menu/actions-menu.template.html',
    styleUrls: ['app/actions-menu/actions-menu.css'],
    controller: function ActionsMenuController($scope, $http, $rootScope) {
      $scope.exportSettings = function() {
        var exportedSettings = JSON.stringify(localStorage);

        var encodedUri = "data:application/octet-stream," + encodeURIComponent(exportedSettings);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        let hoy = new Date;

        var fecha = hoy.getFullYear().toString() + (hoy.getMonth() + 1).toString() + hoy.getDate().toString();
        link.setAttribute("download", "hearthstone_pity_timer_tracker_settings_" + fecha + ".csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".

      }


      $scope.importSettings = function() {

      }

      $scope.clearSettings = function() {
        // we should ask for confirmation before actually clearing everything
        localStorage.clear();
        // a more elegant solution will be used in the final version
        alert("The settings have been reset! Page will be reloaded now");
        location.reload();

      }


    }
  });
