(function() {
  'use strict';

  angular
    .module('dc')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('character-sheet', {
        url: '/character-sheet',
        // templateUrl: 'app/character-sheet/character-sheet.html',
        // controller: 'CharacterController',
        // controllerAs: 'vm',
        views: {
          "name@character-sheet": {
            templateUrl: 'app/character-sheet/views/name.html',
            controller: 'CharacterController',
            controllerAs: 'vm'
          },
          "basic@character-sheet": {
            templateUrl: 'app/character-sheet/views/basic-info.html',
            controller: 'CharacterController',
            controllerAs: 'vm'
          },
          "": {
            templateUrl: 'app/character-sheet/character-sheet.html',
            controller: 'CharacterController',
            controllerAs: 'vm'
          }

        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
