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
    vm.getSkillNames = function() {
      skillsService.getSkillNames().then(function(skillNames) {
        vm.skillNames = skillNames;
      });
    };

    //Get all of the skill info
    vm.getSkills = function() {
      skillsService.getSkills().then(function(skills) {
        vm.skills = skills;
        vm.getSkillMods(vm.skills, statsService.statMods)
      });
    };

    //Get all of the skill info
    vm.setTraining = function(training, skill, proficiencyBonus) {
      $log.log(training);
      if(training === true){
        skill.proficiencyBonus = proficiencyBonus;
      } else {
        skill.proficiencyBonus = 0;
      }
    };

    //Get the skill modifiers
    // vm.getSkillMods = function(skills, statMods){
    //   for(var i in vm.skills){
    //     vm.skills[i].total = statsService.statMods[vm.skills[i].abilityScore.toLowerCase()];
    //   }
    // };

    activate();

    function activate() {
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

    // vm.showSkillDialog = function(ev, skill) {
    //     $mdDialog.show({
    //         controller: SkillDialogController,
    //         templateUrl: '/app/character-sheet/skills/skill.dialog.html',
    //         // parent: angular.element($document[0].body),
    //         parent: angular.element(document.body),
    //         targetEvent: ev,
    //         clickOutsideToClose:true,
    //         controllerAs: 'dialog'
    //     })
    //     .then(function(skill) {
    //       $log.log(skill);
    //         //vm.characters.push(character);
    //     }, function() {
    //         //Dialog Canceled
    //     });
    // };

    vm.showSkillDialog = function(ev, skill) {
    $mdDialog.show({
      controller: SkillDialogController,
      templateUrl: '/app/character-sheet/skills/skill.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      controllerAs: 'dialog',
      locals: {
        skill: skill
      }
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };

    function SkillDialogController($mdDialog, skill) {
      var vm = this;
      vm.skill = skill;
      vm.hide = function() {
        $mdDialog.hide();
      };

      vm.cancel = function() {
        $mdDialog.cancel();
      };

      vm.answer = function(answer) {
        $mdDialog.hide(answer);
      };

      // //use dbService to save a new character to the database
      // vm.newCharacter = function(character){
      //     var db = dbService.newDB();
      //     db.characters.add(character);
      //     $mdDialog.hide(character);
      // };
    }
  }
})();
