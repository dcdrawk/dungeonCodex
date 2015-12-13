(function() {
    'use strict';

    angular
        .module('dc')
        .controller('basicInfoController', basicInfoController);

    // basicInfoController.$inject = ['dependencies'];

    /* @ngInject */
    function basicInfoController($http, $scope, basicInfoService) {
        var vm = this;
        //Get Races
        vm.getRaces = function() {
          basicInfoService.getRaces().then(function(races){
            vm.races = races;
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
