(function() {
    'use strict';

    angular
        .module('dc')
        .controller('statsController', statsController);

    // basicInfoController.$inject = ['dependencies'];

    /* @ngInject */
    function statsController(statsService, $log) {
        var vm = this;
        vm.statMods = {};

        vm.getStatModifier = function(stat, score){
          vm.statMods[stat] = statsService.getStatModifier(score);
        }
    }
})();
