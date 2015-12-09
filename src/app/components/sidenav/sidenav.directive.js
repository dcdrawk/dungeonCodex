(function() {
  'use strict';

  angular
    .module('dc')
    .directive('sidenav', sidenav);

  /** @ngInject */
  function sidenav() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/sidenav/sidenav.html',
    //   scope: {
    //       creationDate: '='
    //   },
      controller: SidenavController,
      controllerAs: 'sn',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SidenavController($scope, $mdSidenav, $timeout) {
        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
        };
        /**
        * Supplies a function that will continue to operate until the
        * time is up.
        */
        function debounce(func, wait) {
        var timer;
        //context;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
            }, wait || 10);
        };
        }
        /**
        * Build handler to open/close a SideNav; when animation finishes
        * report completion in console
        */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                .toggle()
                .then(function () {
                    // $log.debug("toggle " + navID + " is done");
                });
            }, 200);
        }
        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                .toggle()
                .then(function () {
                    // $log.debug("toggle " + navID + " is done");
                });
            }
        }
        $scope.close = function () {
            $mdSidenav('left').close()
            .then(function () {
            // $log.debug("close LEFT is done");
            });
        };
        $scope.open = function () {
            $mdSidenav('left').open()
            .then(function () {
            // $log.debug("close LEFT is done");
            });
        };
        
        $scope.toggle = function () {
            $mdSidenav('left').toggle()
            .then(function () {
            // $log.debug("close LEFT is done");
            });
        };
    }
  }

})();
