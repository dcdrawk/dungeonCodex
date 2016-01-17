(function() {
    'use strict';

    angular
        .module('dc')
        .factory('fileService', fileService);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function fileService($http) {
        var service = {
            getFile: getFile
        };

        return service;

        //Returns a json file
        function getFile(path, fileName, fileExtension) {
          return $http({
            method: 'GET',
            url: path + fileName + fileExtension
          }).then(function(response) {
            response.data.fileName = fileName;
            return response.data;
          });
        }
    }
})();
