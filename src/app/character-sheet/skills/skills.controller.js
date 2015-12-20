(function() {
  'use strict';

  angular
    .module('dc')
    .controller('SkillsController', SkillsController);

  //Controller.$inject = ['dependencies'];

  /* @ngInject */
  function SkillsController(skillsService, $log, $scope, $mdDialog, statsService, $timeout, $document) {
    var vm = this;

    //Bind statMods to this controller
    vm.statMods = statsService.statMods;

    //Get the skill names
    // vm.getSkillNames = function() {
    //   skillsService.getSkillNames().then(function(skillNames) {
    //     vm.skillNames = skillNames;
    //   });
    // };

    //Get all of the skill info
    vm.getSkills = function() {
      skillsService.getSkills().then(function(skills) {
        vm.skills = skills;
        vm.getSkillMods(vm.skills, statsService.statMods)
      });
    };

    //Get all of the skill info
    // vm.setTraining = function(training, skill, proficiencyBonus) {
    //   $log.log(training);
    //   if(training === true){
    //     skill.proficiencyBonus = proficiencyBonus;
    //   } else {
    //     skill.proficiencyBonus = 0;
    //   }
    // };

    activate();

    function activate() {
      vm.getSkills();
    }

    vm.showSkillDialog = function(ev, id, skill, skills, abilityModifier) {
      $mdDialog.show({
        controller: SkillDialogController,
        templateUrl: '/app/character-sheet/skills/skill.dialog.html',
        parent: angular.element($document[0].body),
        targetEvent: ev,
        clickOutsideToClose: true,
        controllerAs: 'dialog',
        locals: {
          id: id,
          skill: skill,
          skills: skills,
          abilityModifier: abilityModifier
        }
      });
    };

    function SkillDialogController($mdDialog, id, skill, skills, abilityModifier, characterService) {
      var vm = this;

      vm.id = id;
      vm.skill = skill;
      vm.skills = skills;
      // vm.trained = trained;
      vm.abilityModifier = abilityModifier;

      // $log.log(vm.trained);
      vm.hide = function() {
        $mdDialog.hide();
      };

      vm.cancel = function() {
        $mdDialog.cancel();
      };

      vm.answer = function(answer) {
        $mdDialog.hide(answer);
      };

      vm.saveSkills = function(skills) {
        characterService.updateCharacter(vm.id, {
          skills: skills
        });
      }
    }
  }
})();
