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
        views: {
          "name@character-sheet": {
            templateUrl: 'app/character-sheet/name/name.html'
            // controller: 'CharacterController',
            // controllerAs: 'nameCtrl'
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
          },
          "skills@character-sheet": {
            templateUrl: 'app/character-sheet/skills/skills.html',
            controller: 'SkillsController',
            controllerAs: 'skillsCtrl'
          },
          "combat-stats@character-sheet": {
            templateUrl: 'app/character-sheet/combat-stats/combat-stats.html',
            controller: 'CombatStatsController',
            controllerAs: 'combatCtrl'
          },
          "health@character-sheet": {
            templateUrl: 'app/character-sheet/health/health.html',
            controller: 'HealthController',
            controllerAs: 'healthCtrl'
          },
          "class-features@character-sheet": {
            templateUrl: 'app/character-sheet/class-features/class-features.html',
            controller: 'ClassFeaturesController',
            controllerAs: 'classFeatsCtrl'
          },
          "personality@character-sheet": {
            templateUrl: 'app/character-sheet/personality/personality.html'
          },
          "saving-throws@character-sheet": {
            templateUrl: 'app/character-sheet/saving-throws/saving-throws.html',
            controller: 'SavingThrowsController',
            controllerAs: 'savingThrowsCtrl'
          },
          "weapons@character-sheet": {
            templateUrl: 'app/character-sheet/weapons/weapons.html',
            controller: 'WeaponsController',
            controllerAs: 'weaponsCtrl'
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
