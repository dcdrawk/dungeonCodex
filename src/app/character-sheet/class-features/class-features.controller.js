(function() {
  'use strict';

  angular
    .module('dc')
    .controller('ClassFeaturesController', ClassFeaturesController);

  // Controller.$inject = ['dependencies'];

  /* @ngInject */
  function ClassFeaturesController($scope, $rootScope, classFeaturesService, $log, $document, $mdDialog) {
    var vm = this;

    var classChanged = $rootScope.$on('classChanged', function(event, className) {
      $log.log(className);
      vm.getClassFeatures(className);
    });

    $rootScope.$on('$destroy', classChanged);

    vm.getClassFeatures = function(className) {
      classFeaturesService.getClassFeatures(className).then(function(classFeatures) {
        // $log.log(classFeatures);
        vm.classFeatures = classFeatures;
        $log.log(vm.classFeatures);
        $scope.$digest();
      });
    }

    activate();

    function activate() {
      // vm.getClassFeatures('Barbarian');
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
          //   id: id,
          //   title: title,
          className: className,
          archetypeName: archetypeName,
          level: level
            //   abilityModifier: abilityModifier,
            //   combatStats: combatStats
        }
      });
    };

    function CombatStatsDialogController($mdDialog, className, archetypeName, level, characterService, classFeaturesService, basicInfoService, $log) {
      var vm = this;
      vm.className = className;
      vm.archetypeName = archetypeName;
      vm.level = level;
      //Cancel the Dialog
      // $log.log(vm.className);
      vm.cancel = function() {
        $mdDialog.cancel();
      };

      //Save the combat stats
      vm.save = function() {
        // characterService.updateCharacter(vm.id, {
        //   combatStats: combatStats
        // });
      };

      vm.getClassFeatures = function(className) {
        classFeaturesService.getClassFeatures(className).then(function(classFeatures) {
          angular.forEach(classFeatures.abilities, function (feature) {
            feature.level = parseFloat(feature.level);
          });
          vm.classFeatures = classFeatures;
          $scope.$digest();
        });
      };

      vm.getArchetypeFeatures = function(archetypeName) {
        classFeaturesService.getArchetypeFeatures(archetypeName).then(function(archetypeFeatures) {
          $log.log(archetypeFeatures);
          angular.forEach(archetypeFeatures.abilities, function (feature) {
            feature.level = parseFloat(feature.level);
          });
          vm.archetypeFeatures = archetypeFeatures;
          $scope.$digest();
        });
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
