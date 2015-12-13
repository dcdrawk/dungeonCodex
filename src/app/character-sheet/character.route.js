(function() {
  'use strict';

  angular
    .module('dc')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('character-sheet', {
        url: '/character-sheet?characterId',
        // templateUrl: 'app/character-sheet/character-sheet.html',
        // controller: 'CharacterController',
        // controllerAs: 'vm',
        views: {
          "name@character-sheet": {
            templateUrl: 'app/character-sheet/views/name.html',
            controller: 'CharacterController',
            controllerAs: 'nameCtrl'
          },
          "basic@character-sheet": {
            templateUrl: 'app/character-sheet/views/basic-info.html',
            controller: 'basicInfoController',
            controllerAs: 'basicCtrl'
          },
          "stats@character-sheet": {
            templateUrl: 'app/character-sheet/views/stats.html',
            controller: 'StatsController',
            controllerAs: 'statsCtrl'
          },
          "": {
            templateUrl: 'app/character-sheet/character-sheet.html',
            controller: 'CharacterController',
            controllerAs: 'charCtrl'
          }

        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
