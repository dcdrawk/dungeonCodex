
(function() {
    'use strict';

    angular
        .module('dc')
        .controller('SkillsController', SkillsController);

    //Controller.$inject = ['dependencies'];

    /* @ngInject */
    function SkillsController(skillsService, $log, $scope, $mdDialog, statsService) {
        var vm = this;

        vm.getSkillNames = function(){
          skillsService.getSkillNames().then(function(skillNames){
            vm.skillNames = skillNames;
            // $scope.$digest();
          });
        };

        vm.getSkills = function(){
          skillsService.getSkills().then(function(skills){
            vm.skills = skills;
            vm.getSkillMods(skills, statsService.statMods)
          });
        };

        vm.getSkillMods = function(skills, statMods){
          for(var skill of skills){
            skill.total = skill.abilityScore;
            $log.log(statMods);
          }
        };

        activate();

        function activate() {
          //$log.log('getting skill names');
          // vm.getSkillNames();
          vm.getSkills();
        }

        vm.doSecondaryAction = function(event) {
          event.preventDefault();
          $mdDialog.show(
            $mdDialog.alert()
              .title('Secondary Action')
              .textContent('Secondary actions can be used for one click actions')
              .ariaLabel('Secondary click demo')
              .ok('Neat!')
              .targetEvent(event)
          );
        };
    }
})();
