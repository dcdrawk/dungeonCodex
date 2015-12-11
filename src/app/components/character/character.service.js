/*
Character Service factory
Author: Devin Cook
*/

// (function() {
//   'use strict';
//
//   angular
//     .module('dc')
//     .service('characterService', characterService);
//
//   /** @ngInject */
//   function characterService($log, $http, dbService, $q) {
//     var vm = this;
//     var characters = [];
//     var character = {name:'bob'};
//
//     //Open the db
//     var db = dbService.newDB();
//
//     vm.getCharacters = function() {
//         characters = [];
//         var deferred = $q.defer();
//
//         db.characters.each(function(character){
//             characters.push(character);
//         }).then(function(){
//             deferred.resolve(characters);
//         });
//
//         return deferred.promise;
//     };
//
//     vm.getCharacter = function(characterId) {
//       dbService.getItem()
//     }
//
//   }
// })();


(function() {
    'use strict';

    angular
        .module('dc')
        .factory('characterService', characterService);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function characterService($log, $http, dbService, $q) {
      var characters = [];
      var character = {name:'bob'};

      //Open the db
      // var db = dbService.newDB();

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
        });
         return deferred.promise;
        // var charactersList = [];
        // return db.characters.toArray(function(characters){
        //   charactersList = characters;
        // }).then(function(){
        //   return $q.when(charactersList);
        // });
      };

      function getCharacter(characterId) {
        var db = dbService.newDB();
        return dbService.getById(db, 'characters', characterId);
      }
    }
})();
