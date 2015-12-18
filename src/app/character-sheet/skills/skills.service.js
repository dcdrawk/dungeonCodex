(function() {
    'use strict';

    angular
        .module('dc')
        .factory('skillsService', skillsService);

    //factory.$inject = ['dependencies'];

    /* @ngInject */
    function skillsService(dbService) {

        var service = {
            getSkills: getSkills
        };

        return service;

        function getSkills() {
          var db = dbService.newDB();
          return dbService.getCollection(db, 'skills');
        }

    }
})();
