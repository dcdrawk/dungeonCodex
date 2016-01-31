(function () {
  'use strict';

  angular
    .module('dc')
    .controller('WeaponsController', WeaponsController);

  //  Controller.$inject = ['dependencies'];

  /* @ngInject */
  function WeaponsController($mdDialog, $document) {
    var vm = this;


    //Show the weapons dialog
    vm.showWeaponsDialog = function (ev, proficiencyBonus, statMods) {
      $mdDialog.show({
        controller: WeaponsDialogController,
        templateUrl: 'app/character-sheet/weapons/weapons.dialog.html',
        parent: angular.element($document[0].body),
        targetEvent: ev,
        clickOutsideToClose: true,
        controllerAs: 'dialog',
        locals: {
          proficiencyBonus: proficiencyBonus,
          statMods: statMods
        }
      });
    };

    //Weapons Dialog controller
    function WeaponsDialogController($mdDialog, proficiencyBonus, statMods, $log, pouchService, autocompleteService, $filter) {
      var vm = this;
      vm.weaponsList = [];
      vm.searchText = '';
      vm.cancel = function () {
        $mdDialog.cancel();
      };

      vm.getAllWeapons = function () {
        var params = {
          selector: {
            type: 'weapon'
          },
          fields: ['name', '_id', 'weaponType'],
          // include_docs: true
        };

        pouchService.query(params).then(function (response) {
          var results = [];
          var sortedResults = autocompleteService.compare(response, 'name');
          vm.weaponsList = sortedResults;
        });

        vm.filterWeapons = function (searchText) {
          var results = [];
          for (var i in vm.weaponsList) {
            //            $log.log(response)
            vm.weaponsList[i].name = vm.weaponsList[i].name.toLowerCase();
            if (vm.weaponsList[i].name.indexOf(searchText) !== -1) {
              results.push(vm.weaponsList[i]);
            }
          }
          return results;
        }
      };

      activate();

      function activate() {
        vm.getAllWeapons();
      }
    }

    activate();

    ////////////////

    function activate() {

    }
  }
})();
