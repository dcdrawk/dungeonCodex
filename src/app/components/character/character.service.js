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
    var character = {};

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
      db.characters.each(function(character) {
        characters.push(character);
      }).then(function() {
        deferred.resolve(characters);
      });
      return deferred.promise;
    }

    //Get a specific character by id
    function getCharacter(id) {
      characterService.test = 'lol';
      var db = dbService.newDB();
      var deferred = $q.defer();
      dbService.getById(db, 'characters', id).then(function(response) {
        character = response;
        deferred.resolve(character);
      });
      return deferred.promise;
    }

    function updateCharacter(id, object) {
      $log.log(id);
      $log.log(object);
      var db = dbService.newDB();
      return dbService.updateById(db, 'characters', id, object);
    }
  }
})();
