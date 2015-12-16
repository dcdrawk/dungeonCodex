
(function() {
    'use strict';

    angular
        .module('dc')
        .controller('SkillsController', SkillsController);

    //Controller.$inject = ['dependencies'];

    /* @ngInject */
    function SkillsController(skillsService, $log, $scope) {
        var vm = this;

        vm.getSkillNames = function(){
          skillsService.getSkillNames().then(function(skillNames){
            vm.skillNames = skillNames;
            // $log.log(skillNames);
            $scope.$digest();
          });
          // $scope.$digest();
        };

        activate();

        function activate() {
          //$log.log('getting skill names');
          vm.getSkillNames();
        }
    }
})();
