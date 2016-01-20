(function() {
  'use strict';

  angular
    .module('dc')
    .factory('classFeaturesService', classFeaturesService);

  // factory.$inject = ['dependencies'];

  /* @ngInject */
  function classFeaturesService(dbService, $log) {
    var service = {
      getClassFeatures: getClassFeatures,
      getArchetypeFeatures: getArchetypeFeatures,
      filterAbilities: filterAbilities
    };

    return service;

    function getClassFeatures(className) {
      var db = dbService.newDB();
      return dbService.getItems(db, 'classFeatures', 'class', className).then(function(classFeatures) {
        // $log.log(classFeatures);
        return classFeatures;
      });
    }

    function getArchetypeFeatures(archetypeName) {
      var db = dbService.newDB();
      return dbService.getItems(db, 'classFeatures', 'archetype', archetypeName).then(function(archetypeFeatures) {
        return archetypeFeatures;
      });
    }

    function filterAbilities(classFeatures, archetype) {
      var results = [];
      for (var i in classFeatures) {
        for (var j in classFeatures[i].abilities) {
          if (classFeatures[i].archetype === 'None') {
            classFeatures[i].abilities[j].level = parseFloat(classFeatures[i].abilities[j].level);
            results.push(classFeatures[i].abilities[j]);
          } else if (archetype && classFeatures[i].archetype === archetype) {
            classFeatures[i].abilities[j].level = parseFloat(classFeatures[i].abilities[j].level);
            results.push(classFeatures[i].abilities[j]);
          }
        }
      }
      return results;
    }
  }
})();
