(function() {
  'use strict';

  angular
    .module('dc')
    .controller('MainController', MainController);

  /** @ngInject */
    function MainController($timeout, webDevTec, toastr, $mdDialog, $scope, $mdMedia, characterService, $document, $log) {
        var vm = this;

        vm.awesomeThings = [];
        vm.classAnimation = '';
        vm.creationDate = 1448827653756;
        vm.showToastr = showToastr;
        // vm.testEvent = testEvent;
        vm.characters = [];

        activate();
        // vm.checked = false;
        function activate() {
            getWebDevTec();
            $timeout(function() {
                vm.classAnimation = 'rubberBand';
            }, 4000);
        }

        function showToastr() {
            toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
            vm.classAnimation = '';
        }

        function getWebDevTec() {
            vm.awesomeThings = webDevTec.getTec();

            angular.forEach(vm.awesomeThings, function(awesomeThing) {
                awesomeThing.rank = Math.random();
            });
        }

      //   function testEvent(ev) {
      //
      //     //var element1 = angular.element(ev.srcElement.offsetParent);
      //     var element1 = document.getElementById('my-button');
      //     // var element2 = angular.element($document[0].querySelector('#main-view'));
      //     var element2 = document.getElementById('main-view');
      //     // console.log(ramjet);
      //     ramjet.transform( element1, element2, {
      // overrideClone: function (node, depth){
      //   if (depth == 0){
      //     return node.cloneNode(); // copy only the root node
      //   }
      // }
    // });
          // $log.log('Hello');
          // $log.log(ev.srcElement.offsetParent);
          // var rect = ele.getBoundingClientRect()
          // //$log.log(rect.top);
          // ele.style.position = 'absolute';
          // ele.style.width = ele.offsetWidth + 'px';
          // ele.style.height = ele.offsetHeight + 'px';
          // ele.style.top = (rect.top - 8) + 'px';
          // ele.style.left = (rect.left - 8) + 'px';


          // angular.element(ele).css('height:500px')
          // angular.element(ele).addClass('red');
        // }

        // dbService.getFile('alignments').then(function(response) {
        //   vm.test = response;
        //   console.log(response);
        //   // $scope.$digest();
        // });

        vm.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '/app/components/newCharacter/new-character.dialog.html',
                parent: angular.element($document[0].body),//
                // parent: angular.element(document.body)
                targetEvent: ev,
                clickOutsideToClose:true,
                controllerAs: 'dialog'
                // .openFrom(ev)
                //fullscreen: $mdMedia('sm') && $scope.customFullscreen
                // fullscreen: true
            })
            .then(function(character) {
                //$scope.status = 'You said the information was "' + answer + '".';
                //$scope.characters = [];
                // characterService.getCharacters().then(function(characters){
                //     vm.characters = characters;
                // });
                vm.characters.push(character);
                // vm.getCharacters();
            }, function() {
                //$scope.status = 'You cancelled the dialog.';
            });
            // $scope.$watch(function() {
            //     return $mdMedia('sm');
            // }, function(sm) {
            //     $scope.customFullscreen = (sm === true);
            // });
        };

        vm.getCharacters = function(){
            //$scope.characters = characterService.getCharacters();
            characterService.getCharacters().then(function(characters){
                vm.characters = characters;
            });
        };

        vm.getCharacters();

        function DialogController($scope, $mdDialog, dbService) {

            var vm = this;

            // var Dexie;
            vm.hide = function() {
                $mdDialog.hide();
            };
            vm.cancel = function() {
                $mdDialog.cancel();
            };
            vm.answer = function(answer) {
                $mdDialog.hide(answer);
            };

            // var basicInfoStore = localforage.createInstance({
            //     name: "myApp",
            //     storeName: 'basicInfo'
            // });




            vm.newCharacter = function(character){
                // var db = new Dexie("DungeonCodex");
                // db.version(1).stores({characters: "++id,name,age"});
                // db.open();
                // //console.log(character);
                var db = dbService.newDB();

                db.characters.add(character);
                $mdDialog.hide(character);
                //$scope.getCharacters();
            };
        }
    }
})();
