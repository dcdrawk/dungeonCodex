(function() {
    'use strict';

    angular
        .module('dc')
        .controller('basicInfoController', basicInfoController);

    // basicInfoController.$inject = ['dependencies'];

    /* @ngInject */
    function basicInfoController($http, $scope, $rootScope, pouchService) {
        var vm = this;

        //Get Races
        vm.getRaces = function() {
          var params = { selector: {type: 'race'}, fields: ['name'] } ;
          pouchService.queryToArray(params, 'name').then(function(races){
            vm.races = races;
          });
        }

        //Get backgrounds
        vm.getBackgrounds = function() {
          var params = { selector: {type: 'background'}, fields: ['name'] } ;
          pouchService.queryToArray(params, 'name').then(function(backgrounds){
            vm.backgrounds = backgrounds;
          });
        }

        //Get the list of classes
        vm.getClasses = function() {
          var params = { selector: {type: 'class'}, fields: ['name'] } ;
          pouchService.queryToArray(params, 'name').then(function(classes){
            vm.classes = classes;
          });
        }

        //Get the list of subraces based on race name
        vm.getSubraces = function(raceName) {
          var params = { selector: {type: 'race', name: raceName}, fields: ['name', 'subraces'], sort: ['type'] } ;
          pouchService.queryToArray(params, 'subraces').then(function(subraces){
            vm.subraces = subraces;
          });
        }

        //Get the list of alignments
        vm.getAlignments = function() {
          var params = { selector: {type: 'alignment'}, fields: ['name'], sort: ['type'] } ;
          pouchService.queryToArray(params, 'name').then(function(alignments){
            vm.alignments = alignments;
          });
        }

        vm.getArchetypes = function (className) {
          var params = { selector: {type: 'class', name: className }, fields: ['name', 'specializations'] } ;
          pouchService.queryToArray(params, 'specializations').then(function(archetypes){
            vm.archetypes = archetypes;
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
