(function() {
  'use strict';

  angular
    .module('dc')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('test', {
        url: '/test',
        templateUrl: 'app/test/test.html',
        controller: 'TestController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
