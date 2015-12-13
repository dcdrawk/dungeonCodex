(function() {
    'use strict';

    angular
        .module('dc')
        .factory('statsService', statsService);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function statsService($log, dbService) {

        var service = {
            getStatModifier: getStatModifier,
            // getClasses: getClasses,
            // getBackgrounds: getBackgrounds,
            // getSubraces: getSubraces,
            // getAlignments: getAlignments
        };

        return service;

        function getStatModifier(score) {
          return Math.floor((parseInt(score)/2 - 5));
        }
    }
})();
