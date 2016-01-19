(function() {
    'use strict';

    angular
        .module('dc')
        .controller('basicInfoController', basicInfoController);

    // basicInfoController.$inject = ['dependencies'];

    /* @ngInject */
    function basicInfoController($http, $scope, $rootScope, basicInfoService, pouchService, $log) {
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

        //Get the list of classes
        vm.getClasses = function() {
          basicInfoService.getClasses().then(function(classes){
            vm.classes = classes;
            $scope.$digest();
          });
        }

        //Get the list of subraces based on race name
        vm.getSubraces = function(raceName) {
          vm.subrace = undefined;
          basicInfoService.getSubraces(raceName).then(function(subraces){
            vm.subraces = subraces;
            $scope.$digest();
          });
        }

        //Get the list of alignments
        vm.getAlignments = function() {
          // basicInfoService.getAlignments().then(function(alignments){
          //   $log.log(alignments);
          //   // vm.alignments = alignments;
          //   // $scope.$digest();
          // });
          var params = { selector: {type: 'alignment'}, fields: ['name'], sort: ['type'] } ;
          pouchService.queryToArray(params).then(function(alignments){
            // $log.log('pouch query');
            // $log.log(alignments);
            vm.alignments = alignments;
          });

        }

        vm.getArchetypes = function (className) {
          basicInfoService.getArchetypes(className).then(function(archetypes){
            vm.archetypes = archetypes;
            $scope.$digest();
          });
          $rootScope.$emit('classChanged', className);
        }

        activate();

        function activate() {
          vm.getRaces();
          vm.getClasses();
          vm.getBackgrounds();
          vm.getAlignments();
        }
    }
})();
