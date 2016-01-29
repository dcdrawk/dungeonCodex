(function () {
  'use strict';
  angular
    .module('dc')
    .factory('autocompleteService', autocompleteService);

  //  autocompleteService.$inject = ['dependencies'];

  /* @ngInject */
  function autocompleteService($log) {
    var exports = {
      filter: filter,
      search: search,
      compare: compare
    };


    return exports;

    ////////////////

    function filter(query) {
      return function filterFn(item) {
        return (item.name.indexOf(query) === 0);
      };
    }

    function search(term) {
      var q = this.$q.defer();
      findValues(term, this.data).then(function (res) {
        q.resolve(res);
      });
      return q.promise;
    }

    function findValues(term, obj) {
      var deferred = this.$q.defer();
      deferred.resolve(this.$filter('filter')(obj, term));
      return deferred.promise;
    }

    function compare(array, key) {
      //      var results = [];
      //      for(var i in array) {
      //        var item = array[i][key].toLowerCase();
      ////        $log.log(comparator);
      ////        $log.log(array[i][key]);
      //        $log.log(item);
      //        $log.log(item.indexOf(comparator));
      //        if(item.indexOf(comparator) >= 0){
      //           results.push(array[i]);
      //        }
      array.sort(function (a, b) {
        var stringA = a[key].toLowerCase(),
            stringB = b[key].toLowerCase();
        if (stringA < stringB) //sort string ascending
          return -1;
        if (stringA > stringB)
          return 1;
        return 0; //default return value (no sorting)
      });

      return array;
    }
    //      return results;
    //      if (a[key] < b[key])
    //        return -1;
    //      else if (a[key] > b.[key])
    //        return 1;
    //      else
    //        return 0;
    //    }

    //    function sort(a, b)

    //    function createFilterFor(query) {
    //      var lowercaseQuery = angular.lowercase(query);
    //      return function filterFn(state) {
    //        return (state.value.indexOf(lowercaseQuery) === 0);
    //      };
    //    }
  }
})();