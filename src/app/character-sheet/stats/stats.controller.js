(function() {
    'use strict';

    angular
        .module('dc')
        .controller('StatsController', StatsController);

    // statsController.$inject = ['dependencies'];

    /* @ngInject */
    function StatsController(statsService) {
        var vm = this;
        vm.statMods = {};
        
        vm.getStatModifier = function(stat, score){
          vm.statMods = statsService.getStatModifier(stat, score);
        }
    }
})();
