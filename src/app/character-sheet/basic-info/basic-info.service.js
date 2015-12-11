(function() {
    'use strict';

    angular
        .module('dc')
        .factory('basicInfoService', basicInfoService);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function basicInfoService($log, dbService, $q) {

      // var deferred = $q.defer();
      //
      // db.characters.each(function(character){
      //     characters.push(character);
      // }).then(function(){
      //     deferred.resolve(characters);
      // });

      // return deferred.promise;


        var service = {
            getRaces: getRaces,
            getClasses: getClasses,
            getBackgrounds: getBackgrounds,
            getSubraces: getSubraces,
            getAlignments: getAlignments
        };

        return service;

        function getRaces() {
          // var deferred = $q.defer();
          var db = dbService.newDB();
          return dbService.getKeys(db, 'races', 'name');

          //return dbService.getKeys(db, 'races', 'name');
        }

        function getClasses() {
          var db = dbService.newDB();
          return dbService.getKeys(db, 'classes', 'name');
        }

        function getBackgrounds() {
          var db = dbService.newDB();
          return dbService.getKeys(db, 'backgrounds', 'name');
        }

        function getSubraces(raceName) {
          var db = dbService.newDB();
          $log.log('get subraces');

          return dbService.getItems(db, 'races', 'name', raceName).then(function(race){
            return race.subraces;
          });
        }

        function getAlignments() {
          var db = dbService.newDB();
          return dbService.getKeys(db, 'alignments', 'name');
        }
    }
})();
