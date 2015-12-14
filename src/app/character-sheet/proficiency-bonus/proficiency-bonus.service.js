(function() {
    'use strict';

    angular
        .module('dc')
        .factory('proficiencyBonusService', proficiencyBonusService);

    //factory.$inject = ['dependencies'];

    /* @ngInject */
    function proficiencyBonusService() {
        var service = {
            getProficiencyBonus: getProficiencyBonus
        };

        return service;

        function getProficiencyBonus(level) {
          return Math.ceil(parseInt(level)/4+1);
        }
    }
})();
