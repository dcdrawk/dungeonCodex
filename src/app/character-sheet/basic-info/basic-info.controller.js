(function() {
    'use strict';

    angular
        .module('dc')
        .controller('basicInfoController', basicInfoController);

    // basicInfoController.$inject = ['dependencies'];

    /* @ngInject */
    function basicInfoController($http, $scope, basicInfoService, $timeout, $log) {
        var vm = this;

        // vm.getRaces = getRaces();
        // vm.getBackgrounds = getBackgrounds();
        // vm.getSubraces = getSubraces('elf');
        //Get Races
        vm.getRaces = function() {
          basicInfoService.getRaces().then(function(races){
            vm.races = races;
            // $log.log(races);
            $scope.$digest();
          });
        }

        //Get backgrounds
        vm.getBackgrounds = function() {
          basicInfoService.getBackgrounds().then(function(backgrounds){
            vm.backgrounds = backgrounds;
            $scope.$digest();
          });
        }

        vm.getClasses = function() {
          basicInfoService.getClasses().then(function(classes){
            vm.classes = classes;
            $scope.$digest();
          });
        }

        vm.getSubraces = function(raceName) {
          vm.subrace = undefined;
          basicInfoService.getSubraces(raceName).then(function(subraces){
            vm.subraces = subraces;
            $scope.$digest();
          });
        }

        vm.getAlignments = function() {
          basicInfoService.getAlignments().then(function(alignments){
            vm.alignments = alignments;
            $scope.$digest();
          });
        }

        vm.getRaces();
        vm.getClasses();
        vm.getBackgrounds();
        vm.getAlignments();
    }
})();

// (function() {
//   'use strict';
//
//   angular
//     .module('dc')
//     .controller('CharacterController', CharacterController);
//
//   /** @ngInject */
//     function CharacterController(characterService) {
//         var vm = this;
//
//     }
// })();
