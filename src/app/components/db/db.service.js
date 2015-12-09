(function() {
  'use strict';

  angular
    .module('dc')
    .service('dbService', dbService);

  /** @ngInject */
  function dbService($http, $log, $mdToast, $q) {
    // var vm = this;
    // var fileNames = ['alignments', 'backgrounds', 'classes', 'feats', 'languages', 'races'];
    var fileNames = ['alignments', 'backgrounds', 'feats', 'races', 'languages', 'classes' ];

    var path = '/assets/game-data/';
    var fileExtension = '.json';
    var url = '';

    // deleteDB();
    return {
      newDB: newDB,
      deleteDB: deleteDB,
      populateDB: populateDB
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
