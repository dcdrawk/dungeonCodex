(function() {
    'use strict';

    angular
        .module('dc')
        .factory('skillsService', skillsService);

    //factory.$inject = ['dependencies'];

    /* @ngInject */
    function skillsService(dbService) {
        var service = {
            getSkillNames: getSkillNames
        };

        return service;

        function getSkillNames() {
          var db = dbService.newDB();
          return dbService.getKeys(db, 'skills', 'name');
        }
    }
})();
