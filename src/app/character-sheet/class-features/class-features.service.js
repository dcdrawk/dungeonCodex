(function() {
    'use strict';

    angular
        .module('dc')
        .factory('classFeaturesService', classFeaturesService);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function classFeaturesService(dbService, $log) {
        var service = {
            getClassFeatures: getClassFeatures
        };

        return service;

        function getClassFeatures(className) {
          var db = dbService.newDB();
          return dbService.getItems(db, 'classFeatures', 'class', className).then(function(classFeatures){
            // $log.log(classFeatures);
            return classFeatures;
          });
        }
    }
})();
