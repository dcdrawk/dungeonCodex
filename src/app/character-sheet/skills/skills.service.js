(function() {
    'use strict';

    angular
        .module('dc')
        .factory('skillsService', skillsService);

    //factory.$inject = ['dependencies'];

    /* @ngInject */
    function skillsService(dbService) {

        var service = {
            getSkillNames: getSkillNames,
            getSkillTotals: getSkillTotals,
            getSkills: getSkills
        };

        return service;

        function getSkillNames() {
          var db = dbService.newDB();
          return dbService.getKeys(db, 'skills', 'name');
        }

        function getSkills() {
          var db = dbService.newDB();
          return dbService.getCollection(db, 'skills');
        }

        function getSkillTotals(skills, stats, proficiencyBonus) {
          $log.log(skills);
          $log.log(stats);
          $log.log(proficiencyBonus);
          // skill.total = skill.abilityModifier + skill.bonus;
          // if(skill.proficiencyBonus = true){
          //   skill.total += proficiencyBonus;
          // }
        }
    }
})();
