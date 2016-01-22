(function() {
  'use strict';

  angular
    .module('dc')
    .controller('HealthController', HealthController);

  // Controller.$inject = ['dependencies'];

  /* @ngInject */
  function HealthController($mdDialog, $document) {
    var vm = this;

    activate();

    function activate() {

    }

    vm.showHealthDialog = function(ev, character, level, title, name, health) {
      $mdDialog.show({
        controller: CombatStatsDialogController,
        templateUrl: '/app/character-sheet/health/health.dialog.html',
        parent: angular.element($document[0].body),
        targetEvent: ev,
        clickOutsideToClose: true,
        controllerAs: 'dialog',
        locals: {
          character: character,
          title: title,
          name: name,
          health: health,
          level: level
        }
      });
    };

    function CombatStatsDialogController($mdDialog, character, level, title, name, health, characterService, pouchService, $log) {
      var vm = this;

      vm.character = character;
      vm.title = title;
      vm.name = name;
      vm.level = level;
      $log.log(health);
      vm.character.healthStats = health;
      
      $log.log(vm.character);

      //Cancel the Dialog
      vm.cancel = function() {
        $mdDialog.cancel();
      };

      //Save the combat stats
      vm.save = function() {
        $log.log(vm.character);
        pouchService.put(vm.character).then(function(update){
          vm.character._rev = update.rev;
        });
//        characterService.updateCharacter(vm.id, {
//          healthStats: healthStats
//        });
      };
    }
  }
})();
