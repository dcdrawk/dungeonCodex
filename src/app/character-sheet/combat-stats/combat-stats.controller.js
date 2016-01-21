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
    vm.descriptions = {
      armorClass: 'Your Armor Class (AC) represents how well your character avoids being wounded in battle. Things that contribute to your AC include the armor you wear, the shield you carry, and your Dexterity modifier.',
      initiative: 'At the beginning of every combat, you roll initiative by making a Dexterity check. Initiative determines the order of creatures’ turns in combat.',
      speed: 'Every character and monster has a speed, which is the distance in feet that the character or monster can walk in 1 round.'
    };
    
    activate();

    function activate() {

    }

    vm.showCombatStatsDialog = function(ev, character, title, name, description, abilityModifier) {
      $mdDialog.show({
        controller: CombatStatsDialogController,
        templateUrl: '/app/character-sheet/combat-stats/combat-stats.dialog.html',
        parent: angular.element($document[0].body),
        targetEvent: ev,
        clickOutsideToClose: true,
        controllerAs: 'dialog',
        locals: {
          character: character,
          title: title,
          name: name,
          description: description,
          abilityModifier: abilityModifier
        }
      });
    };

    function CombatStatsDialogController($mdDialog, character, title, name, description, abilityModifier, characterService, pouchService) {
      var vm = this;

      vm.character = character;
      vm.description = description;
      vm.abilityModifier = abilityModifier;
      vm.name = name;
      vm.title = title;
//      vm.combatStats = vm.character.combatStats;
      
      //Cancel the Dialog
      vm.cancel = function() {
        $mdDialog.cancel();
      };

      //Save the combat stats
      vm.save = function(character){
        pouchService.put(vm.character).then(function(update){
          $log.log('Combat stats updated!');
          vm.character._rev = update.rev;
        });
      };
    }
  }
})();