(function() {
  'use strict';

  angular
    .module('dc')
    .service('dbService', dbService);

  /** @ngInject */
  function dbService($http, $log, $mdToast) {

    var fileNames = ['alignments', 'backgrounds', 'feats', 'races', 'languages', 'classes' ];
    var path = '/assets/game-data/';
    var fileExtension = '.json';
    // var url = '';

    return {
      newDB: newDB,
      deleteDB: deleteDB,
      populateDB: populateDB,
      getKeys: getKeys,
      getItems: getItems,
      getById: getById,
      updateById: updateById
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
      db.open();
      return db;
    }

    function deleteDB(db) {
      db.delete().then(function() {
        //Databse is deleted
      }).catch(function (err) {
        //Catch any errors
        $log.error("Could not delete database");
        $log.error(err);
      }).finally(function() {
        // Repopulate the db
        populateDB(db);
      });
    }

    function populateDB(db) {
      db.open();
      //go through each file name in the array
      angular.forEach( fileNames, function(fileName){
        return new Dexie.Promise(function (resolve, reject) {
          getFile(fileName).then(function(data){
            addItems(db, fileName, data);
            resolve(data);
            reject(data);
          });
        }).then(function (data) {
          $log.log(data);
        }).catch(function (error) {
          $log.log(error);
        }).then(function () {
          $log.log("Transaction committed");
        });
      });
      //Show the toast
      $mdToast.show(
        $mdToast.simple()
          .textContent('Database successfully reset!')
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
      return db[table].orderBy(param).keys(function (keys) {
          return keys;
      });
    }

    //Get multiple items
    function getItems(db, table, key, query){
      // return queryResult;
      return db[table].where(key).equalsIgnoreCase(query).toArray(function(array){
        return array[0];
      });
    }

    //Get by id
    function getById(db, table, id){
      return db[table].where("id").equals(parseInt(id)).toArray(function(array){
        return array[0];
      });
    }

    //Returns a json file
    function getFile(fileName) {
      return $http({
        method: 'GET',
        url: path + fileName + fileExtension
      }).then(function(response) {
        return response.data;
      });
    }

    function updateById(db, table, id, object){
      return db[table].update(id, object).then(function (updated) {
        if (!updated)
        //   $log.log("Item updated");
        // else
          $log.error("Item id " + id + " could not be updated. Does it exist?");
        return;
      });
    }
  }
})();
