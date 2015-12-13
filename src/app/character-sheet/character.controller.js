(function() {
  'use strict';

  angular
    .module('dc')
    .controller('CharacterController', CharacterController);

  /** @ngInject */
    function CharacterController($stateParams, characterService, $log, basicInfoService) {
        var vm = this;
        var characterId = $stateParams.characterId;

        vm.getCharacter = function(characterId){
          characterService.getCharacter(characterId).then(function(character){
            vm.character = character;
          });
        }

        vm.updateCharacter = function(id, object){
          $log.log('update the cahracter!');
          characterService.updateCharacter(id, object);
        }

        activate();

        function activate() {
          $log.log(characterId);
          vm.getCharacter(characterId);
        }


    }
})();
