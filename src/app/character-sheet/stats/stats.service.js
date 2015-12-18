(function() {
    'use strict';

    angular
        .module('dc')
        .factory('statsService', statsService);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function statsService() {
      var statMods = {};

        var service = {
            getStatModifier: getStatModifier,
            statMods: statMods
        };

        return service;

        function getStatModifier(stat, score) {
          statMods[stat] = Math.floor((parseInt(score)/2 - 5));
          return statMods;
        }
    }
})();
