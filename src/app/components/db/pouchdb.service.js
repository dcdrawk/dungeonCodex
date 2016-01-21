(function() {
  'use strict';

  angular
    .module('dc')
    .factory('pouchService', pouchService);

  // factory.$inject = ['dependencies'];

  /* @ngInject */
  function pouchService($log, $q, $mdToast, fileService) {
    var db = new PouchDB('appData', {
      size: 5
    });
    // alert('howdy!');
    // alert(db.info());
    // var test = openDatabase('appData', 1, 'appData', 5000000, function (db) { alert('it works!'); });

    var fileNames = ['alignments', 'backgrounds', 'feats', 'races', 'languages', 'classes', 'classFeatures', 'skills'];
    // var fileNames = ['alignments', 'backgrounds', 'feats', 'races', 'languages', 'classes', 'classFeatures', 'skills'];

    var path = '/assets/game-data/';
    var fileExtension = '.json';

    var service = {
      info: info,
      populateDB: populateDB,
      deleteDB: deleteDB,
      allDocs: allDocs,
      query: query,
      queryToArray: queryToArray,
      get: get,
      put: put,
      post: post
    };

    return service;

    function info() {
      // alert('resul');
      return $q(function(resolve, reject) {
        db.info().then(function(result) {
          // alert(result);
          resolve(result);
        }).catch(function(err) {
          alert(err);
          reject(err);
        });
      });
    }

    function deleteDB() {
      return $q(function(resolve, reject) {
        db.destroy().then(function(response) {
          db = new PouchDB('appData');
          resolve(response);
        }).catch(function(err) {
          alert(err);
          reject(err);
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
          reject(err);
        });
      });
    }


    //Popupate the DB with docs from the json game-data
    function populateDB() {
      return $q(function(resolve, reject) {
        
        //Create an index for characters
        createCharacterIndex();
        
        //Go through the list of file names
        for (var fileName of fileNames) {
          fileService.getFile(path, fileName, fileExtension).then(function(file) {
            var bulkDoc = file[file.fileName];
            db.bulkDocs(bulkDoc).then(function() {
              //Create a design doc for the file
              var mapName = file.fileName.slice(0, file.fileName.length - 1).toLowerCase();
              db.createIndex({
                index: {
                  fields: ['type'],
                  name: mapName,
                  ddoc: mapName
                }
              }).then(function(result) {
                // yo, a result
                resolve(result);
              }).catch(function(err) {
                // ouch, an error
                alert(err);
              });
            }).catch(function(err) {
              alert(err);
              reject(err);
            });
          });
        }
      });
    }

    //query the pouchdb, uses indexes
    //Example query params:
    //var params = { selector: {type: 'index'}, fields: ['_id', 'name'] }
    function query(params) {
      return $q(function(resolve, reject) {
        db.find(params).then(function(result) {
          // yo, a result
          $log.log(result);
          resolve(result.docs);
        }).catch(function(err) {
          // ouch, an error
          $log.error(err);
          reject(err);
        });
      });
    }

    //query the pouchdb and return an array
    //Example query params:
    //var params = { selector: {type: 'index'...}, fields: ['name'...] }
    function queryToArray(params, key) {
      return $q(function(resolve, reject) {
        db.find(params).then(function(result) {
          var docs = result.docs;
          var resultsArray = [];
          for (var i in docs) {
            resultsArray.push(docs[i][key]);
          }
          // return the result
          if (typeof resultsArray[0] === 'object') {
            resolve(resultsArray[0].sort());
          } else {
            resolve(resultsArray.sort());
          }
        }).catch(function(err) {
          // ouch, an error
          $log.error(err);
          reject(err);
        });
      });
    }


    //Initialize the character index
    function createCharacterIndex() {
      db.createIndex({
        index: {
          fields: ['type'],
          name: 'character',
          ddoc: 'character'
        }
      }).then(function(result) {//
        // handle result
        $log.log('created character index');
        $log.log(result);
      }).catch(function(err) {
        //handle error
        $log.log(err);
      });
    }
    
    //Get a document from the db
    //Requires an '_id'
    function get(id) {
      return $q(function(resolve, reject) {
        db.get(id).then(function(response) {
          resolve(response);
        }).catch(function(err) {
          $log.error(err);
          reject(err);
        });
      });
    }
    
    //Put a document into the db
    //Requires the doc to have and '_id' and '_rev'
    function put(doc) {
      return $q(function(resolve, reject) {
        db.put(doc).then(function(response) {
          $log.log(response);
          resolve(response);
        }).catch(function(err) {
          $log.error(err);
          reject(err);
        });
      });
    }
    
    //Post a document into the db
    //Auto-generates an '_id' and '_rev'
    function post(doc) {
      return $q(function(resolve, reject) {
        db.post(doc).then(function(response) {
          $log.log(response);
          resolve(response);
        }).catch(function(err) {
          $log.error(err);
          reject(err);
        });
      });
    }
  }
})();
