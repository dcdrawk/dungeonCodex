(function() {
  'use strict';

  angular
    .module('dc')
    .service('dbService', dbService);

  /** @ngInject */
  function dbService($http, $log, $mdToast, $q) {

    var fileNames = ['alignments', 'backgrounds', 'feats', 'races', 'languages', 'classes' ];
    var path = '/assets/game-data/';
    var fileExtension = '.json';
    var url = '';

    return {
      newDB: newDB,
      deleteDB: deleteDB,
      populateDB: populateDB,
      getKeys: getKeys,
      getItems: getItems
    };

    function newDB() {
      var db = new Dexie("DungeonCodex");
      db.version(2).stores({
        characters: "++id,name,race,subrace,class,alignment,background,level,experience",
        classes: "++id,name,hitPoints,proficiencies,abilities,specializations",
        backgrounds: "++id,name,description,toolProficiencies,skillProficiencies,languages,equipment,feature,special",
        feats: "++id,name,description",
        languages: "++id,type",
        races: "++id,name,abilityScoreIncrease,speed,languages,traits,subraces",
        alignments: "++id,name,description"
      });
      // db.on("populate", populateDB(db));
      // populateDB(db);
      db.open();
      return db;
    }

    function deleteDB(db) {
      // db = newDB();
      db.delete().then(function() {
          // toastr.info("Database successfully deleted");
          //$log.log("Database successfully deleted");
          // $mdToast.show(
          //   $mdToast.simple()
          //     .textContent('Database successfully deleted! ')
          //     // .position($scope.getToastPosition())
          //     // .hideDelay(3000)
          // );
      }).catch(function (err) {
          $log.error("Could not delete database");
          $log.error(err);
      }).finally(function() {
          // Do what should be done next...
          populateDB(db);
      });
    }

    function populateDB(db) {
      // db = newDB();
      db.open();
      $log.log('lets populate the db!');
      $log.log(fileNames);

      // var deferred = $q.defer();
      // var promises = [];

      angular.forEach( fileNames, function(fileName){
        return new Dexie.Promise(function (resolve, reject) {
          $log.log('I PROMISE TO GET:');
          $log.log(fileName);
          getFile(fileName).then(function(data){
            $log.log(data);
            addItems(db, fileName, data);
            resolve(data);
          });
        }).then(function (data) {

        }).then(function () {
          console.log ("Transaction committed");
        });
      });
      //Show the toast
      $mdToast.show(
        $mdToast.simple()
          .textContent('Database successfully reset! ')
          // .position($scope.getToastPosition())
          // .hideDelay(3000)
      );
    }

    //Adds items to a table
    function addItems(db, table, data){
      db.transaction('rw!', db[table], function () {
        angular.forEach( data[table], function(item){
          db[table].add(item);
        });
      });
    }

    //Gets keys from a table
    function getKeys(db, table, param){
      // List all the first name of all my friends:
      return db[table].orderBy('name').keys(function (keys) {
          // $log.log(keys);
          return keys;
      });
    }

    // function getCollection(db, table, key, query){
    //   var queryResult = [];
    //   return db[table]
    //     .where(key).equalsIgnoreCase(query)
    //     .each(function(item, cursor){
    //       queryResult.push(item[key]);
    //   }).then(function(){
    //     return queryResult;
    //   });
    // }

    function getItems(db, table, key, query){
      var queryResult = [];
      // return queryResult;
      return db.races.where(key).equalsIgnoreCase(query).toArray(function(array){
        return array[0];
      });
        // return db.races.where("id").equalsIgnoreCase("1");


    }

    // function getItems(db, table, key, query){
    //   var queryResult = [];
    //   return db[table]..each(function(item, cursor){
    //     queryResult.push(item[key]);
    //   }).then(function(){
    //     return queryResult;
    //   });
    // }

    //Returns a json file
    function getFile(fileName) {
      return $http({
        method: 'GET',
        url: path + fileName + fileExtension
      }).then(function(response) {
        return response.data;
      });
    }
  }
})();
