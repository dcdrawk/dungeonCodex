(function() {
    'use strict';

    angular
        .module('dc')
        .factory('statsService', statsService);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function statsService($log) {
      var statMods = {};
      //statMods.strength = 8;

        var service = {
            getStatModifier: getStatModifier,
            statMods: statMods,
            // statMods['strength']: statMods['strength']
        };

        return service;

        function getStatModifier(stat, score) {
          statMods[stat] = Math.floor((parseInt(score)/2 - 5));
          $log.log(statMods[stat]);
          return statMods;
        }
    }
})();
