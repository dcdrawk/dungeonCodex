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
      var character = 'test';
      var self = this;

      var service = {
          getCharacters: getCharacters,
          getCharacter: getCharacter,
          updateCharacter: updateCharacter,
          character: character
      };

      return service;

      function getCharacters() {
        characters = [];
        var db = dbService.newDB();
        var deferred = $q.defer();
        $log.log('getting characters!');
        $log.log(db.version());
        db.characters.each(function(character){
            characters.push(character);
        }).then(function(){
            deferred.resolve(characters);
            // return deferred.promise;
        });
        return deferred.promise;
      }

      //Get a specific character by id
      function getCharacter(id) {
        var db = dbService.newDB();
        $log.log('dwa');
        self.character = 'weeaboo';
        return dbService.getById(db, 'characters', id).then(function(response){
          character = response;
          return character;
        });
        // return dbService.getById(db, 'characters', id);
      }

      function updateCharacter(id, object) {
        $log.log(id);
        $log.log(object);
        var db = dbService.newDB();
        return dbService.updateById(db, 'characters', id, object)
      }
    }
})();
