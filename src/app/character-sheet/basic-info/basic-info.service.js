(function() {
    'use strict';

    angular
        .module('dc')
        .factory('basicInfoService', basicInfoService);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function basicInfoService($log, dbService) {

        var service = {
            getRaces: getRaces,
            getClasses: getClasses,
            getBackgrounds: getBackgrounds,
            getSubraces: getSubraces,
            getAlignments: getAlignments,
            getSpeed: getSpeed
        };

        return service;

        function getRaces() {
          var db = dbService.newDB();
          return dbService.getKeys(db, 'races', 'name');
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
          return dbService.getItems(db, 'races', 'name', raceName).then(function(race){
            return race.subraces;
          });
        }

        function getAlignments() {
          var db = dbService.newDB();
          return dbService.getKeys(db, 'alignments', 'name');
        }

        function getSpeed(race) {
          var db = dbService.newDB();
          return dbService.getItems(db, 'races', 'name', race).then(function(race){
            $log.log(race.speed);
            return race.speed;
          });
          // return dbService.getItems(db, 'races', 'name', race);
        }
    }
})();
