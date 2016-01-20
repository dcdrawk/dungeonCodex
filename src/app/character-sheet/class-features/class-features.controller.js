(function() {
  'use strict';

  angular
    .module('dc')
    .controller('ClassFeaturesController', ClassFeaturesController);

  // Controller.$inject = ['dependencies'];

  /* @ngInject */
  function ClassFeaturesController($scope, $rootScope, classFeaturesService, $log, $document, $mdDialog, pouchService) {
    var vm = this;

    var classChanged = $rootScope.$on('classChanged', function(event, className) {
      vm.className = className;
      vm.getClassFeatures(className);
    });

    var archetypeChanged = $rootScope.$on('archetypeChanged', function(event, archetype) {
      vm.archetype = archetype;
      vm.classFeatures = classFeaturesService.filterAbilities(vm.classFeaturesList, archetype);
    });

    $rootScope.$on('$destroy', classChanged);
    $rootScope.$on('$destroy', archetypeChanged);

    vm.getClassFeatures = function(className) {
      var params = {
        selector: {
          type: 'classFeature',
          class: className
        },
        fields: ['class', 'archetype', 'abilities']
      };

      pouchService.query(params).then(function(classFeaturesList) {
        vm.classFeaturesList = classFeaturesList;
        vm.classFeatures = classFeaturesService.filterAbilities(classFeaturesList, vm.archetype);
      });
    }

    activate();

    function activate() {
    }

    vm.showClassFeaturesDialog = function(ev, className, archetypeName, level) {
      $mdDialog.show({
        controller: CombatStatsDialogController,
        templateUrl: '/app/character-sheet/class-features/class-features.dialog.html',
        parent: angular.element($document[0].body),
        targetEvent: ev,
        clickOutsideToClose: true,
        controllerAs: 'dialog',
        locals: {
          className: className,
          archetypeName: archetypeName,
          level: level
        }
      });
    };

    function CombatStatsDialogController($mdDialog, className, archetypeName, level, characterService, classFeaturesService, basicInfoService, $log) {
      var vm = this;
      vm.className = className;
      vm.archetypeName = archetypeName;
      vm.level = level;

      vm.cancel = function() {
        $mdDialog.cancel();
      };

      //Save the combat stats
      // vm.save = function() {
      //   // characterService.updateCharacter(vm.id, {
      //   //   combatStats: combatStats
      //   // });
      // };

      vm.getClassFeatures = function(className) {
        vm.archetypeFeatures = [];
        var params = {
          selector: {
            type: 'classFeature',
            class: className,
            archetype: 'None'
          },
          fields: ['class', 'archetype', 'abilities']
        };
        pouchService.query(params).then(function(classFeatures) {
          angular.forEach(classFeatures[0].abilities, function(feature) {
            feature.level = parseFloat(feature.level);
          });
          vm.classFeatures = classFeatures[0];
        });
        // classFeaturesService.getClassFeatures(className).then(function(classFeatures) {
        //   angular.forEach(classFeatures.abilities, function(feature) {
        //     feature.level = parseFloat(feature.level);
        //   });
        //   vm.classFeatures = classFeatures;
        //   $scope.$digest();
        // });
      };

      vm.getArchetypeFeatures = function(archetypeName) {
        var params = {
          selector: {
            type: 'classFeature',
            class: vm.className,
            archetype: archetypeName
          },
          fields: ['class', 'archetype', 'abilities']
        };
        pouchService.query(params).then(function(archetypeFeatures) {
            angular.forEach(archetypeFeatures[0].abilities, function(feature) {
              feature.level = parseFloat(feature.level);
            });
          vm.archetypeFeatures = archetypeFeatures[0];
        });

        // classFeaturesService.getArchetypeFeatures(archetypeName).then(function(archetypeFeatures) {
        //   $log.log(archetypeFeatures);
        //   angular.forEach(archetypeFeatures.abilities, function(feature) {
        //     feature.level = parseFloat(feature.level);
        //   });
        //   vm.archetypeFeatures = archetypeFeatures;
        //   $scope.$digest();
        // });
      };

      vm.getClassList = function() {
        basicInfoService.getClasses().then(function(classList) {
          vm.classList = classList;
          $scope.$digest();
        });
      };

      vm.getArchetypesList = function() {
        basicInfoService.getArchetypes(vm.className).then(function(archetypes) {
          vm.archetypeList = archetypes;
          $scope.$digest();
        });
      };

      activate();

      function activate() {
        vm.getClassFeatures(vm.className);
        vm.getArchetypeFeatures(vm.archetypeName);
        vm.getClassList();
        vm.getArchetypesList();
      }

    }
  }
})();
