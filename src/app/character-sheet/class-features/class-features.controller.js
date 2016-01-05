(function() {
  'use strict';

  angular
    .module('dc')
    .controller('ClassFeaturesController', ClassFeaturesController);

  // Controller.$inject = ['dependencies'];

  /* @ngInject */
  function ClassFeaturesController($scope, $rootScope, classFeaturesService, $log, $document, $mdDialog) {
    var vm = this;

    $rootScope.$on('classChanged', function(event, className) {
      $log.log(className);
      vm.getClassFeatures(className);
    });

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

    vm.showClassFeaturesDialog = function(ev, className, level) {
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
          level: level
            //   abilityModifier: abilityModifier,
            //   combatStats: combatStats
        }
      });
    };

    function CombatStatsDialogController($mdDialog, className, level, characterService, classFeaturesService, basicInfoService, $log) {
      var vm = this;
      vm.className = className;
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
          // $log.log(classFeatures);
          vm.classFeatures = classFeatures;
          // $log.log(vm.classFeatures);
          $scope.$digest();
        });
      };

      vm.getClassList = function() {
        basicInfoService.getClasses().then(function(classList) {
          vm.classList = classList;
          $scope.$digest();
        })
      };

      activate();

      function activate() {
        vm.getClassFeatures(vm.className);
        vm.getClassList();
      }
      
    }
  }
})();
