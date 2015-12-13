(function() {
  'use strict';

  angular
    .module('dc')
    .controller('SettingsController', SettingsController);

  /** @ngInject */
    function SettingsController(toastr, $mdDialog, $document, dbService) {
        var vm = this;
        vm.deleteDB = deleteDB;
        vm.showAlert = showAlert;
        vm.showConfirm = showConfirm;
        vm.populateDB = populateDB;

        function deleteDB() {
          var db = dbService.newDB();
          dbService.deleteDB(db);
        }

        function showAlert(ev) {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element($document[0].querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Delete Database')
              .textContent('Are you sure you want to delete the Database?')
              .ariaLabel('Delete DB Dialog')
              .ok('Confirm')
              .targetEvent(ev)
          );
        }

        function showConfirm(ev) {
          var confirm = $mdDialog.confirm()
                .title('Confirm Reset Database')
                .textContent('Are you sure you want to reset the database? Any saved data will be lost.')
                .ariaLabel('Database Delete confirmation Dialog')
                .targetEvent(ev)
                .ok('Reset')
                .cancel('Cancel');
          $mdDialog.show(confirm).then(function() {
            //Delete the database
            deleteDB();
          }, function() {
            //Dialog Cancelled
          });
        }

        function populateDB() {
          //Populates the db
          var db = dbService.newDB();
          deleteDB();
          dbService.populateDB(db);
        }

    }
})();
