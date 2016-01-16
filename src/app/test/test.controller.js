(function() {
    'use strict';

    angular
        .module('dc')
        .controller('TestController', TestController);

    // Controller.$inject = ['dependencies'];

    /* @ngInject */
    function TestController(pouchService) {
        var vm = this;

        activate();

        function activate() {
          vm.test = pouchService.test();
        }
    }
})();
