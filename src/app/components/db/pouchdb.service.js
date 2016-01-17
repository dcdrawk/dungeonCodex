(function() {
  'use strict';

  angular
    .module('dc')
    .factory('pouchService', pouchService);

  // factory.$inject = ['dependencies'];

  /* @ngInject */
  function pouchService($log, $q, $mdToast, fileService) {
    var db = new PouchDB('appData');

    var fileNames = ['alignments', 'backgrounds'];
    // var fileNames = ['alignments', 'backgrounds', 'feats', 'races', 'languages', 'classes', 'classFeatures', 'skills'];

    var path = '/assets/game-data/';
    var fileExtension = '.json';

    var service = {
      test: test,
      info: info,
      populateDB: populateDB,
      deleteDB: deleteDB,
      allDocs: allDocs,
      query: query
    };

    return service;

    function test() {
      // var deferred = $q.defer();
      //
      // return db.info().then(function (result) {
      //   $log.log(result);
      //   // return result;
      //   deferred.resolve(result);
      //   return deferred.promise;
      // }).catch(function (err) {
      //   $log.error(err);
      // });
    }

    function info() {
      return $q(function(resolve, reject) {
        db.info().then(function(result) {
          resolve(result);
        });
      });
    }

    function deleteDB() {
      return $q(function(resolve, reject) {
        db.destroy().then(function(response) {
          db = new PouchDB('appData');
          resolve(response);
        }).catch(function(err) {
          console.log(err);
        });
      });
    }

    function allDocs() {
      return $q(function(resolve, reject) {
        db.allDocs({
          include_docs: true,
          attachments: false
        }).then(function(result) {
          // handle result
          resolve(result);
        }).catch(function(err) {
          $log.log(err);
        });
      });
    }

    function populateDB() {
      return $q(function(resolve, reject) {
        for (var fileName of fileNames) {
          fileService.getFile(path, fileName, fileExtension).then(function(file) {
            var bulkDoc = file[file.fileName];
            db.bulkDocs(bulkDoc).then(function(result) {
              //Create a design doc for the bulk documents
              var mapName = file.fileName.slice(0, file.fileName.length - 1).toLowerCase();

              db.createIndex({
                index: {
                  fields: ['type'],
                  name: mapName,
                  ddoc: mapName
                }
              }).then(function (result) {
                // yo, a result
              }).catch(function (err) {
                // ouch, an error
              });

              // var designDoc = createDesignDoc(file.fileName);
              // db.put(designDoc).then(function(doc) {
              //   // design doc created!
              //   resolve(result);
              // }).catch(function(err) {
              //   $log.error(err);
              // });

            }).catch(function(err) {
              $log.error(err);
            });
          });
        }
      });
    }

    // function mapFunction(doc, mapName) {
    //   if (doc.type === mapName) {
    //     emit(doc.name, doc.description);
    //   }
    // }

    // function createDesignDoc(name) {
    //   var ddoc = {
    //     _id: '_design/' + name,
    //     views: {}
    //   };
    //   ddoc.views[name] = {
    //     map: function(doc) {
    //       emit(doc.name);
    //     }.toString()
    //   };
    //   return ddoc;
    // }

    function query(index) {
      // db.query('alignments').then(function(result) {
      //   // do something with result
      //   $log.log('HERE ARE THE' + index);
      //   $log.log(result);
      // });
      db.find({
        // selector: {name: 'Acolyte'},
        selector: {type: {$eq: 'background'}},
        fields: ['_id', 'name', 'description'],
        sort: ['type']
      }).then(function (result) {
        // yo, a result
        $log.log('reesultss');
        $log.log(result);
      }).catch(function (err) {
        // ouch, an error
        $log.error(err);
      });
    }

  }
})();
