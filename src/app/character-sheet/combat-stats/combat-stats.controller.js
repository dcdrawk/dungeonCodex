(function() {
    'use strict';

    angular
        .module('dc')
        .controller('CombatStatsController', CombatStatsController);

    // Controller.$inject = ['dependencies'];

    /* @ngInject */
    function CombatStatsController(statsService, $log, $mdDialog, $document) {
        var vm = this;
        vm.statMods = statsService.statMods;
        vm.descriptions = {};
        vm.descriptions.ac = 'Test Description for AC';
        // vm.dexMod = vm.statMods.dexterity;
        // vm.statMods = 'lol';
        // $log.log(statsService.statMods);
        activate();

        function activate() {

        }

        vm.showCombatStatsDialog = function(ev, id, title, name, description, abilityModifier, bonus) {
          $mdDialog.show({
            controller: CombatStatsDialogController,
            templateUrl: '/app/character-sheet/combat-stats/combat-stats.dialog.html',
            parent: angular.element($document[0].body),
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'dialog',
            locals: {
              id: id,
              title: title,
              name: name,
              description: description,
              abilityModifier: abilityModifier,
              bonus: bonus
            }
          });
        };

        function CombatStatsDialogController($mdDialog, id, title, name, description, abilityModifier, bonus, characterService, $scope) {
          var vm = this;

          vm.id = id;
          vm.description = description;
          vm.abilityModifier = abilityModifier;
          vm.name = name;
          vm.title = title;
          vm.bonus = bonus;

          //$log.log(vm.trained);
          vm.hide = function() {
            $mdDialog.hide();
          };

          vm.cancel = function() {
            $mdDialog.cancel();
          };

          vm.answer = function(answer) {
            $mdDialog.hide(answer);
          };

          vm.saveBonus = function(name, bonus) {
            $log.log(name);
            // characterService.updateCharacter(vm.id, {
            //   acBonus: acBonus
            // });

            characterService.updateCharacter(vm.id, {
              acBonus: bonus
            }).then(function(){
              $scope.$digest();
            });
            // characterService.getCharacter(vm.id).then(function(character){
            //   $log.log(character);
            // });
            // switch(name) {
            //     case 'acBonus':
            //     // $log.log('ac bonus!');
            //       characterService.updateCharacter(vm.id, {
            //         acBonus: bonus
            //       });
            //       characterService.getCharacter(vm.id);
            //       break;
            //     case 'initiativeBonus':
            //       $log.log('init bonus');
            //       break;
            //     case 'speedBonus':
            //       $log.log('speed bonus');
            // }
          }
        }
    }
})();
