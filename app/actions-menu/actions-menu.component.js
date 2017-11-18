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
        console.log("Starting to import settings");
        var f = document.getElementById('file').files[0],
            r = new FileReader();

        r.onloadend = function(e) {
          var importedSettings = e.target.result;
          try {
            var importedSettingsJSON = JSON.parse(importedSettings);
          } catch (error) {
            console.error("There was an error parsing the imported file with JSON" + error);
          }

          for (var key in importedSettingsJSON) {
              localStorage.setItem(key, importedSettingsJSON[key]);
              console.log("adding " + key + " to localStorage with value: " + importedSettingsJSON[key]);
          }
          // reload the page after importing
          location.reload();



        }
        // investigation is needed to know why the import fails when this is not present
        // even though we're not doing nothing with this
        r.readAsBinaryString(f);

      }

      $scope.clearSettings = function() {
        localStorage.clear();
        // a more elegant solution will be used in the final version
        location.reload();

      }


    }
  });
