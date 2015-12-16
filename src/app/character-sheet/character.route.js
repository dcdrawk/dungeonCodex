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
            templateUrl: 'app/character-sheet/name/name.html',
            controller: 'CharacterController',
            controllerAs: 'nameCtrl'
          },
          "basic@character-sheet": {
            templateUrl: 'app/character-sheet/basic-info/basic-info.html',
            controller: 'basicInfoController',
            controllerAs: 'basicCtrl'
          },
          "stats@character-sheet": {
            templateUrl: 'app/character-sheet/stats/stats.html',
            controller: 'StatsController',
            controllerAs: 'statsCtrl'
          },
          "proficiency-bonus@character-sheet": {
            templateUrl: 'app/character-sheet/proficiency-bonus/proficiency-bonus.html'
            // controller: 'ProficiencyBonusController',
            // controllerAs: 'profCtrl'
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
