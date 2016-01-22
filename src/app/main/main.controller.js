(function () {
  'use strict';

  angular
    .module('dc')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $mdDialog, $scope, $mdMedia, characterService, $document) {
    var vm = this;
    vm.characters = [];


    vm.showCreateCharacterDialog = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/components/newCharacter/new-character.dialog.html',
        parent: angular.element($document[0].body), //
        targetEvent: ev,
        clickOutsideToClose: true,
        controllerAs: 'dialog'
      });
    };

    vm.getCharacters = function () {
      //$scope.characters = characterService.getCharacters();
      characterService.getCharacters().then(function (characters) {
        vm.characters = characters;
      });
    };

    function DialogController($scope, $mdDialog, dbService, pouchService) {
      var vm = this;

      vm.hide = function () {
        $mdDialog.hide();
      };

      vm.cancel = function () {
        $mdDialog.cancel();
      };

      vm.answer = function (answer) {
        $mdDialog.hide(answer);
      };

      //use dbService to save a new character to the database
      vm.newCharacter = function (character) {
        character.type = 'character';
        pouchService.post(character);
        //                var db = dbService.newDB();
        //                db.characters.add(character);
        $mdDialog.hide(character);
      };
    }

    activate();

    function activate() {
      //Get the list of characters from the db
      vm.getCharacters();
    }
  }
})();
