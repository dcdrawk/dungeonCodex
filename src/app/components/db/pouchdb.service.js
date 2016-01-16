(function() {
  'use strict';

  angular
    .module('dc')
    .factory('pouchService', pouchService);

  // factory.$inject = ['dependencies'];

  /* @ngInject */
  function pouchService($log) {
    var db = new PouchDB('appData');
    // var remoteCouch = false;
    $log.log('test me sum pouch dee bee ');
    var service = {
      test: test
    };

    return service;

    function test() {
      return db;
    }
  }
})();
