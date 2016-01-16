(function() {
    'use strict';

    angular
        .module('dc')
        .factory('classFeaturesService', classFeaturesService);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function classFeaturesService(dbService) {
        var service = {
            getClassFeatures: getClassFeatures,
            getArchetypeFeatures: getArchetypeFeatures
        };

        return service;

        function getClassFeatures(className) {
          var db = dbService.newDB();
          return dbService.getItems(db, 'classFeatures', 'class', className).then(function(classFeatures){
            // $log.log(classFeatures);
            return classFeatures;
          });
        }

        function getArchetypeFeatures(archetypeName) {
          var db = dbService.newDB();
          return dbService.getItems(db, 'classFeatures', 'archetype', archetypeName).then(function(archetypeFeatures){
            return archetypeFeatures;
          });
        }
    }
})();
