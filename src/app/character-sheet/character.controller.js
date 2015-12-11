(function() {
  'use strict';

  angular
    .module('dc')
    .controller('CharacterController', CharacterController);

  /** @ngInject */
    function CharacterController($stateParams, characterService) {
        var vm = this;
        var characterId = $stateParams.characterId;

        vm.getCharacter = function(characterId){
          characterService.getCharacter(characterId);
        }

        activate();

        function activate() {
          // vm.getCharacter(characterId).then(function(character){
          //   vm.character = character;
          // });
        }


    }
})();
