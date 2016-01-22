(function() {
    'use strict';

    angular
        .module('dc')
        .controller('SavingThrowsController', SavingThrowsController);

    // SavingThrowsController.$inject = ['dependencies'];

    /* @ngInject */
    function SavingThrowsController(statsService) {
        var vm = this;
        vm.statMods = statsService.statMods;

        activate();

        function activate() {

        }
    }
})();
