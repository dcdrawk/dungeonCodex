(function() {
    'use strict';

    angular
        .module('dc')
        .factory('statsService', statsService);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function statsService() {

        var service = {
            getStatModifier: getStatModifier
        };

        return service;

        function getStatModifier(score) {
          return Math.floor((parseInt(score)/2 - 5));
        }
    }
})();
