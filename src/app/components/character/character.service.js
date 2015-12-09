(function() {
  'use strict';

  angular
    .module('dc')
    .service('characterService', characterService);

  /** @ngInject */
  function characterService($log, $http, dbService, $q) {
    var vm = this;
    var characters = [];

    //Open the db
    var db = dbService.newDB();

    vm.getCharacters = function(){
        characters = [];
        var deferred = $q.defer();

        db.characters.each(function(character){
            characters.push(character);
        }).then(function(){
            deferred.resolve(characters);
        });

        return deferred.promise;
    };

    // var apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';

    // var service = {
    //   apiHost: apiHost,
    //   getContributors: getContributors
    // };

    // return service;

    // function getContributors(limit) {
    //   if (!limit) {
    //     limit = 30;
    //   }

    //   return $http.get(apiHost + '/contributors?per_page=' + limit)
    //     .then(getContributorsComplete)
    //     .catch(getContributorsFailed);

    //   function getContributorsComplete(response) {
    //     return response.data;
    //   }

    //   function getContributorsFailed(error) {
    //     $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
    //   }
    // }

  }
})();
