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
  function characterService($log, $http, dbService, $q, pouchService) {
//    var characters = [];
    var character = {};

    var service = {
      getCharacters: getCharacters,
      getCharacter: getCharacter,
      updateCharacter: updateCharacter,
      character: character,
      saveCharacter: saveCharacter
    };

    return service;

    function getCharacters() {
//      var params = {};
      
      var params = { selector: {type: 'character'}, fields: ['name', '_id'] } ;
      return pouchService.query(params).then(function(characters){
        //$log.log(characters);
        return characters;
      });
//      characters = [];
//      var db = dbService.newDB();
//      var deferred = $q.defer();
//      db.characters.each(function(character) {
//        characters.push(character);
//      }).then(function() {
//        deferred.resolve(characters);
//      });
//      return deferred.promise;
    }

    //Get a specific character by id
    function getCharacter(id) {
//      var params = { selector: {type: 'character'}, fields: ['name', '_id'] } ;
      return pouchService.get(id).then(function(character){
//        $log.log(character);
        return character;
      });
//      characterService.test = 'lol';
//      var db = dbService.newDB();
//      var deferred = $q.defer();
//      dbService.getById(db, 'characters', id).then(function(response) {
//        character = response;
//        deferred.resolve(character);
//      });
//      return deferred.promise;
    }

    function updateCharacter(character) {
      pouchService.put(character).then(function(characters){
        $log.log(characters);
      });
//      $log.log(id);
//      $log.log(object);
//      var db = dbService.newDB();
//      return dbService.updateById(db, 'characters', id, object);
    }
    
    function saveCharacter(character) {
      return pouchService.put(character).then(function(character){
        $log.log(character);
        return character;
      });
    }
  }
})();
