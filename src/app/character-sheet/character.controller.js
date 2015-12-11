(function() {
  'use strict';

  angular
    .module('dc')
    .controller('CharacterController', CharacterController);

  /** @ngInject */
    function CharacterController($stateParams, characterService, $log) {
        var vm = this;
        var characterId = $stateParams.characterId;

        vm.getCharacter = function(characterId){
          characterService.getCharacter(characterId).then(function(character){
            vm.character = character;
          });
        }

        activate();

        function activate() {
          $log.log(characterId);
          vm.getCharacter(characterId);
        }


    }
})();
