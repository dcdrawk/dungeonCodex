(function() {
  'use strict';

  angular
    .module('dc')
    .controller('CharacterController', CharacterController);

  /** @ngInject */
  function CharacterController($stateParams, characterService, proficiencyBonusService, $log, $scope, $rootScope, pouchService) {
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
      var params = { selector: {type: 'race', name: race}, fields: ['speed'] } ;
      pouchService.query(params).then(function(result){
        vm.character.speed = result[0].speed;
      });
    };

    //Get the hit dice for the class
    vm.getHitDice = function(className) {
      var params = { selector: {type: 'class', name: className}, fields: ['hitDice'] } ;
      pouchService.query(params).then(function(result){
        vm.character.hitDice = result[0].hitDice;
      });
    };

    vm.emitArchetype = function(archetype) {
      $rootScope.$emit('archetypeChanged', archetype);
    }

    activate();

    function activate() {
      $log.log('character id = ' + characterId);
      vm.getCharacter(characterId);
    }
  }
})();
