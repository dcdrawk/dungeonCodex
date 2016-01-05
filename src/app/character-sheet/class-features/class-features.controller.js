(function() {
    'use strict';

    angular
        .module('dc')
        .controller('ClassFeaturesController', ClassFeaturesController);

    // Controller.$inject = ['dependencies'];

    /* @ngInject */
    function ClassFeaturesController($scope, $rootScope, classFeaturesService, $log) {
        var vm = this;

        $rootScope.$on('classChanged', function(event, className) {
          $log.log(className);
          vm.getClassFeatures(className);
        });

        vm.getClassFeatures = function(className) {
          classFeaturesService.getClassFeatures(className).then(function(classFeatures){
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
    }
})();
