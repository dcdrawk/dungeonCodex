/*
Character Service factory
Author: Devin Cook
*/

(function() {
    'use strict';

    angular
        .module('dc')
        .factory('characterService', characterService);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function characterService($log, $http, dbService, $q) {
      var characters = [];

      var service = {
          getCharacters: getCharacters,
          getCharacter: getCharacter
      };

      return service;

      function getCharacters() {
        characters = [];
        var db = dbService.newDB();
        var deferred = $q.defer();

        db.characters.each(function(character){
            characters.push(character);
        }).then(function(){
            deferred.resolve(characters);
            return deferred.promise;
        });
      }

      //Get a specific character by id
      function getCharacter(id) {
        var db = dbService.newDB();
        return dbService.getById(db, 'characters', id);
      }
    }
})();
