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
      var weaponsList = [];

      vm.cancel = function () {
        $mdDialog.cancel();
      };

      vm.getAllWeapons = function () {
        var params = {
          selector: {
            type: 'weapon'
          },
          fields: ['name']
        };

        pouchService.query(params).then(function (response) {
          var results = [];
          var sortedResults = autocompleteService.compare(response, 'name');
          $log.log(sortedResults);
          weaponsList = sortedResults;
          $log.log('here be the waepons listssdas');
          $log.log(weaponsList);
        });

        vm.filterWeapons = function (searchText) {
          $log.log(weaponsList);
          var results = [];
          for (var i in weaponsList) {
            //            $log.log(response)
            weaponsList[i].name = weaponsList[i].name.toLowerCase();
            if (weaponsList[i].name.indexOf(searchText) !== -1) {
              results.push(weaponsList[i]);
            }
          }
          $log.log(results);
          return results;
        }

        //        pouchService.search(query).then(function(response){
        //          $log.log('done getting query...');
        //        })
        //         var params = {
        //            selector: {
        ////
        //              type: 'weapon',
        //              name: {$eq:'dagger'}
        //            },
        //            fields: ['name']
        //          };

        //          pouchService.autocomplete('Simple Weapon', searchText).then(function(reponse) {
        //            $log.log('done getting query...');
        //          });

        //        autocompleteService.filter()

      };

      // vm.getAllWeapons = function () {
        //        var params = { selector: {type: 'weapon'}, fields: ['name'] } ;
        //        pouchService.queryToArray(params, 'name').then(function(response){
        ////          vm.subraces = subraces;
        //          $log.log(response);
        //          $log.log('FLBUIDWJAIO');
        //        });
      // }

      //        pouchService.query(params).then(function(archetypeFeatures) {
      //          $log.log(archetypeFeatures);
      //            angular.forEach(archetypeFeatures[0].abilities, function(feature) {
      //              feature.level = parseFloat(feature.level);
      //            });
      //          vm.archetypeFeatures = archetypeFeatures[0];
      //        });


      //        pouchService.queryToArray(params, 'name').then(function(classList){
      //          vm.classList = classList;
      //        });

      //      vm.getArchetypesList = function() {
      //        var params = { selector: {type: 'class', name: vm.className }, fields: ['name', 'specializations'] } ;
      //        pouchService.queryToArray(params, 'specializations').then(function(archetypeList){
      //          vm.archetypeList = archetypeList;
      //        });
      //      };

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
