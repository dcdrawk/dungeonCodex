(function() {
  'use strict';

  angular
    .module('dc')
    .controller('SkillsController', SkillsController);

  //Controller.$inject = ['dependencies'];

  /* @ngInject */
  function SkillsController($log, $scope, $mdDialog, statsService, $timeout, $document, pouchService) {
    var vm = this;

    //Bind statMods to this controller
    vm.statMods = statsService.statMods;

    //Get all of the skill info
    vm.getSkills = function() {
      var params = { selector: {type: 'skill'}, fields: ['name', 'abilityScore', 'description'] } ;
      pouchService.query(params).then(function(skills){
        vm.skills = skills;
      });
    };

    activate();

    function activate() {
      vm.getSkills();
    }

    vm.showSkillDialog = function(ev, character, skill, skills, abilityModifier) {
      $mdDialog.show({
        controller: SkillDialogController,
        templateUrl: 'app/character-sheet/skills/skill.dialog.html',
        parent: angular.element($document[0].body),
        targetEvent: ev,
        clickOutsideToClose: true,
        controllerAs: 'dialog',
        locals: {
          character: character,
          skill: skill,
          skills: skills,
          abilityModifier: abilityModifier
        }
      });
    };

    function SkillDialogController($mdDialog, character, skill, skills, abilityModifier) {
      var vm = this;

      vm.character = character;
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

      vm.saveSkills = function() {
        pouchService.put(vm.character).then(function(update){
          vm.character._rev = update.rev;
        });
//        characterService.updateCharacter(vm.id, {
//          skills: skills
//        });
      }
    }
  }
})();
