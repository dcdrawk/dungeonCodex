(function () {
  'use strict';

  angular
    .module('dc')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $mdDialog, $scope, $mdMedia, characterService, $document, $log) {
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
      })
      .then(function(character) {
          $log.log('here is the character:');
          $log.log(character);
          vm.characters.push(character);
      }, function() {
          //Dialog Canceled
      });
    };

    vm.getCharacters = function () {
      //$scope.characters = characterService.getCharacters();
      characterService.getCharacters().then(function (characters) {
        vm.characters = characters;
      });
    };

    function DialogController($scope, $mdDialog, dbService, pouchService, $log) {
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
        pouchService.post(character).then(function(response){
          character._id = response.id;
          character._rev = response.rev;
          $log.log(response);
          $mdDialog.hide(character);
        });
        //                var db = dbService.newDB();
        //                db.characters.add(character);
//        $mdDialog.hide(character);
      };
    }

    activate();

    function activate() {
      //Get the list of characters from the db
      vm.getCharacters();
    }
  }
})();
