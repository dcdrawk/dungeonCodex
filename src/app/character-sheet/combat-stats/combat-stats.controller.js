(function() {
    'use strict';

    angular
        .module('dc')
        .controller('CombatStatsController', CombatStatsController);

    // Controller.$inject = ['dependencies'];

    /* @ngInject */
    function CombatStatsController(statsService, $log) {
        var vm = this;
        vm.statMods = statsService.statMods;
        // vm.dexMod = vm.statMods.dexterity;
        // vm.statMods = 'lol';
        // $log.log(statsService.statMods);
        activate();

        function activate() {

        }
    }
})();
