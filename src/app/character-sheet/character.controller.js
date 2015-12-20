(function() {
  'use strict';

  angular
    .module('dc')
    .controller('CharacterController', CharacterController);

  /** @ngInject */
    function CharacterController($stateParams, characterService, proficiencyBonusService, basicInfoService, $log, $scope) {
        var vm = this;
        var characterId = $stateParams.characterId;
        // vm.character = characterService.character;

        vm.getCharacter = function(characterId){
          characterService.getCharacter(characterId).then(function(character){
            vm.character = character;
            $log.log(characterService);
            $log.log(character);
            vm.getSpeed(vm.character.race);
          });
        };

        vm.updateCharacter = function(id, object){
          characterService.updateCharacter(id, object);
        };

        vm.getProficiencyBonus = function(level){
          vm.character.proficiencyBonus = proficiencyBonusService.getProficiencyBonus(level);
        };

        vm.getSpeed = function(race){
          basicInfoService.getSpeed(race).then(function(speed){
            $log.log('done getting speed');
            vm.character.speed = speed;
            $scope.$digest();
          });
        }
        activate();

        function activate() {
          $log.log(characterId);
          vm.getCharacter(characterId);
          // vm.getSpeed(vm.character.race);
        }
    }
})();
