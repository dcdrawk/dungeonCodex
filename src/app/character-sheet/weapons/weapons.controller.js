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
    vm.showWeaponsDialog = function (ev, character, statMods) {
      $mdDialog.show({
        controller: WeaponsDialogController,
        templateUrl: 'app/character-sheet/weapons/weapons.dialog.html',
        parent: angular.element($document[0].body),
        targetEvent: ev,
        clickOutsideToClose: true,
        controllerAs: 'dialog',
        locals: {
          character: character,
          statMods: statMods
        }
      });
    };

    //Weapons Dialog controller
    function WeaponsDialogController($mdDialog, character, statMods, $log, pouchService, autocompleteService, $filter) {
      var vm = this;
      vm.weaponsList = [];
      vm.searchText = '';
      // vm.weapons = [];
      vm.myOrder = 'name';
      vm.character = character;
      vm.selected = [];
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
        vm.addWeapon = function (weaponName) {
          var params = {
            selector: {
              type: 'weapon',
              name: weaponName
            },
            fields: ['name', '_id', 'weaponType', 'cost', 'damage', 'damageType', 'properties', 'weight'],
            // include_docs: true
          };
          pouchService.query(params).then(function (response) {

            vm.character.weapons.push(response[0]);

            pouchService.put(vm.character).then(function(update){
              vm.character._rev = update.rev;
            });
          });
        }

        vm.showWeaponDetails = function (weaponName) {
          var params = {
            selector: {
              type: 'weapon',
              name: weaponName
            },
            fields: ['name', '_id', 'weaponType', 'cost', 'damage', 'damageType', 'properties', 'weight'],
            // include_docs: true
          };

          pouchService.query(params).then(function (response) {
            $log.log(response);
            vm.weaponDetails = response[0];
          });
        }

        vm.removing = {};
        vm.showActions = function (weapon) {
          weapon.showActions = true;
          // vm.removing[index] = true;
        };

        //Hide equiped weapon actions
        vm.hideActions = function (weapon) {
          weapon.showActions = false;
          // vm.removing[index] = false;
        };

        //Clear weapon details
        vm.clearWeaponDetails = function () {
          vm.weaponDetails = null;
        };

        //Remove weapons from the list
        vm.removeWeapon = function (index) {
          var array = $filter('orderBy')(vm.character.weapons, vm.myOrder);

          vm.removing[index] = false;
          array.splice(index, 1);
          vm.character.weapons = array;

          pouchService.put(vm.character).then(function(update){
            vm.character._rev = update.rev;
          });
        };
      };

      activate();

      function activate() {
        vm.getAllWeapons();

        if(!vm.character.weapons) {
          vm.character.weapons = [];
        }
      }
    }

    activate();

    ////////////////

    function activate() {

    }
  }
})();
