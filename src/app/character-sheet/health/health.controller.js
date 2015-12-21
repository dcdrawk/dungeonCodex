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

    vm.showHealthDialog = function(ev, id, level, title, name, health) {
      $mdDialog.show({
        controller: CombatStatsDialogController,
        templateUrl: '/app/character-sheet/health/health.dialog.html',
        parent: angular.element($document[0].body),
        targetEvent: ev,
        clickOutsideToClose: true,
        controllerAs: 'dialog',
        locals: {
          id: id,
          title: title,
          name: name,
          health: health,
          level: level
        }
      });
    };

    function CombatStatsDialogController($mdDialog, id, level, title, name, health, characterService) {
      var vm = this;

      vm.id = id;
      vm.title = title;
      vm.name = name;
      vm.level = level;
      vm.health = health;

      //Cancel the Dialog
      vm.cancel = function() {
        $mdDialog.cancel();
      };

      //Save the combat stats
      vm.save = function(healthStats) {
        characterService.updateCharacter(vm.id, {
          healthStats: healthStats
        });
      };
    }
  }
})();
