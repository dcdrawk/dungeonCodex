(function() {
  'use strict';

  angular
    .module('dc')
    .controller('TestController', TestController);

  // Controller.$inject = ['dependencies'];

  /* @ngInject */
  function TestController($log, $scope, pouchService, $mdToast) {
    var vm = this;



    vm.deleteDB = function() {
      pouchService.deleteDB().then(function() {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Database deleted!')
        );
        vm.getDBInfo();
        // vm.getAllDocs();
      });
    };

    vm.populateDB = function() {
      pouchService.populateDB().then(function() {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Database populated!')
        );
        vm.getDBInfo();
        // vm.getAllDocs();
      });
    };

    vm.getDBInfo = function() {
      pouchService.info().then(function(dbInfo) {
        // alert(dbInfo);
        vm.test = dbInfo;
      });
    };

    vm.getAllDocs = function() {
      pouchService.allDocs().then(function(docs){
//        $log.log(docs)
//        vm.docs = JSON.stringify(docs, null, 4);
        // vm.docs = docs.toJson();
      });
    };

    vm.query = function (index) {
      pouchService.query(index);
    }
    // vm.getDBInfo();

    activate();

    function activate() {
      // $log.log('test!');
      vm.getDBInfo();
      // vm.getAllDocs();
      // vm.query('class');
    }
  }
})();
