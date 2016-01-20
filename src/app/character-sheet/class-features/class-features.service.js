(function() {
  'use strict';

  angular
    .module('dc')
    .factory('classFeaturesService', classFeaturesService);

  // factory.$inject = ['dependencies'];

  /* @ngInject */
  function classFeaturesService(dbService) {
    var service = {
      filterAbilities: filterAbilities
    };

    return service;

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
