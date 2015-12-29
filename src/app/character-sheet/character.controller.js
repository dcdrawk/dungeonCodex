(function() {
  'use strict';

  angular
    .module('dc')
    .controller('CharacterController', CharacterController);

  /** @ngInject */
  function CharacterController($stateParams, characterService, proficiencyBonusService, basicInfoService, $log, $scope) {
    var vm = this;
    var characterId = $stateParams.characterId;

    //Get a character based on id
    vm.getCharacter = function(characterId) {
      characterService.getCharacter(characterId).then(function(character) {
        vm.character = character;
        vm.getSpeed(vm.character.race);
        vm.getHitDice(vm.character.class);
      });
    };

    //Update the character
    vm.updateCharacter = function(id, object) {
      characterService.updateCharacter(id, object);
    };

    //Get the characters proficiency bonus
    vm.getProficiencyBonus = function(level) {
      vm.character.proficiencyBonus = proficiencyBonusService.getProficiencyBonus(level);
    };

    //Get character speed based on race
    vm.getSpeed = function(race) {
      basicInfoService.getSpeed(race).then(function(speed) {
        vm.character.speed = speed;
        $scope.$digest();
      });
    };

    //Get the hit dice for the class
    vm.getHitDice = function(className) {
      basicInfoService.getHitDice(className).then(function(hitDice) {
        vm.character.hitDice = hitDice;
        $scope.$digest();
      });
    };

    activate();

    function activate() {
      $log.log('character id = ' + characterId);
      vm.getCharacter(characterId);
    }
  }
})();
