!function(){"use strict";angular.module("dc",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ngMaterial","toastr"])}(),function(){"use strict";function t(){function t(){return n}var n=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"}];this.getTec=t}angular.module("dc").service("webDevTec",t)}(),angular.module("dc").config(["$mdThemingProvider",function(t){t.theme("default").primaryPalette("blue",{"default":"700","hue-1":"400","hue-2":"600","hue-3":"A100"}).accentPalette("green",{"default":"400"})}]),function(){"use strict";function t(){function t(t,n,e){function o(n,o){var a;return function(){var i=t,r=Array.prototype.slice.call(arguments);e.cancel(a),a=e(function(){a=void 0,n.apply(i,r)},o||10)}}function a(t){return o(function(){n(t).toggle().then(function(){})},200)}function i(t){return function(){n(t).toggle().then(function(){})}}t.toggleLeft=a("left"),t.toggleRight=i("right"),t.isOpenRight=function(){return n("right").isOpen()},t.close=function(){n("left").close().then(function(){})},t.open=function(){n("left").open().then(function(){})},t.toggle=function(){n("left").toggle().then(function(){})}}var n={restrict:"E",templateUrl:"app/components/sidenav/sidenav.html",controller:t,controllerAs:"sn",bindToController:!0};return t.$inject=["$scope","$mdSidenav","$timeout"],n}angular.module("dc").directive("sidenav",t)}(),function(){"use strict";function t(){function t(t,n,e){var o=this;o.relativeDate=t(o.creationDate).fromNow(),e.toggle=function(){n("left").toggle().then(function(){})}}var n={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["moment","$mdSidenav","$scope"],n}angular.module("dc").directive("acmeNavbar",t)}(),function(){"use strict";function t(t){function n(n,e,o,a){var i,r=t(e[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});e.addClass("acme-malarkey"),angular.forEach(n.extraValues,function(t){r.type(t).pause()["delete"]()}),i=n.$watch("vm.contributors",function(){angular.forEach(a.contributors,function(t){r.type(t.login).pause()["delete"]()})}),n.$on("$destroy",function(){i()})}function e(t,n){function e(){return o().then(function(){t.info("Activated Contributors View")})}function o(){return n.getContributors(10).then(function(t){return a.contributors=t,a.contributors})}var a=this;a.contributors=[],e()}var o={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:n,controller:e,controllerAs:"vm"};return e.$inject=["$log","githubContributor"],o}angular.module("dc").directive("acmeMalarkey",t),t.$inject=["malarkey"]}(),function(){"use strict";function t(t,n){function e(e){function a(t){return t.data}function i(n){t.error("XHR Failed for getContributors.\n"+angular.toJson(n.data,!0))}return e||(e=30),n.get(o+"/contributors?per_page="+e).then(a)["catch"](i)}var o="https://api.github.com/repos/Swiip/generator-gulp-angular",a={apiHost:o,getContributors:e};return a}angular.module("dc").factory("githubContributor",t),t.$inject=["$log","$http"]}(),function(){"use strict";function t(t,n,e,o,a){function i(){l(),t(function(){s.classAnimation="rubberBand"},4e3)}function r(){e.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),s.classAnimation=""}function l(){s.awesomeThings=n.getTec(),angular.forEach(s.awesomeThings,function(t){t.rank=Math.random()})}var s=this;s.awesomeThings=[],s.classAnimation="",s.creationDate=1448827653756,s.showToastr=r,i(),a.showAdvanced=function(t){o.show({controller:DialogController,templateUrl:"dialog1.tmpl.html",parent:angular.element(document.body),targetEvent:t,clickOutsideToClose:!0,fullscreen:$mdMedia("sm")&&a.customFullscreen}).then(function(t){a.status='You said the information was "'+t+'".'},function(){a.status="You cancelled the dialog."}),a.$watch(function(){return $mdMedia("sm")},function(t){a.customFullscreen=t===!0})}}angular.module("dc").controller("MainController",t),t.$inject=["$timeout","webDevTec","toastr","$mdDialog","$scope"]}(),function(){"use strict";function t(t){t.debug("runBlock end")}angular.module("dc").run(t),t.$inject=["$log"]}(),function(){"use strict";function t(t,n){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),n.otherwise("/")}angular.module("dc").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("dc").constant("malarkey",malarkey).constant("moment",moment)}(),function(){"use strict";function t(t,n){t.debugEnabled(!0),n.allowHtml=!0,n.timeOut=3e3,n.positionClass="toast-top-right",n.preventDuplicates=!0,n.progressBar=!0}angular.module("dc").config(t),t.$inject=["$logProvider","toastrConfig"]}(),angular.module("dc").run(["$templateCache",function(t){t.put("app/main/main.html",'<div class="title-bar md-padding"><h1>Characters</h1></div><md-button class="md-fab md-accent add-button" aria-label="Comment"><md-icon class="material-icons">add</md-icon></md-button><section class="md-padding" layout="row"><md-card ng-click="test()" class="md-padding" flex="33" md-ink-ripple=""><md-card-title><md-card-title-text><p class="md-headline">Drawkcab</p><p class="md-subhead">Level 12 Halfling Rogue</p></md-card-title-text></md-card-title></md-card><md-card class="md-padding" flex="33"><md-card-title><md-card-title-text><span class="md-headline">Drawkcab</span> <span class="md-subhead">Level 12 Halfling Rogue</span></md-card-title-text></md-card-title></md-card></section>'),t.put("app/components/dialog/template.html",'<md-dialog aria-label="Mango (Fruit)" ng-cloak=""><form><md-toolbar><div class="md-toolbar-tools"><h2>Mango (Fruit)</h2><span flex=""></span><md-button class="md-icon-button" ng-click="cancel()"><md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class="md-dialog-content"><h2>Using .md-dialog-content class that sets the padding as the spec</h2><p>The mango is a juicy stone fruit belonging to the genus Mangifera, consisting of numerous tropical fruiting trees, cultivated mostly for edible fruit. The majority of these species are found in nature as wild mangoes. They all belong to the flowering plant family Anacardiaceae. The mango is native to South and Southeast Asia, from where it has been distributed worldwide to become one of the most cultivated fruits in the tropics.</p><img style="margin: auto; max-width: 100%;" alt="Lush mango tree" src="img/mangues.jpg"><p>The highest concentration of Mangifera genus is in the western part of Malesia (Sumatra, Java and Borneo) and in Burma and India. While other Mangifera species (e.g. horse mango, M. foetida) are also grown on a more localized basis, Mangifera indica&mdash;the "common mango" or "Indian mango"&mdash;is the only mango tree commonly cultivated in many tropical and subtropical regions.</p><p>It originated in Indian subcontinent (present day India and Pakistan) and Burma. It is the national fruit of India, Pakistan, and the Philippines, and the national tree of Bangladesh. In several cultures, its fruit and leaves are ritually used as floral decorations at weddings, public celebrations, and religious ceremonies.</p></div></md-dialog-content><md-dialog-actions layout="row"><md-button href="http://en.wikipedia.org/wiki/Mango" target="_blank" md-autofocus="">More on Wikipedia</md-button><span flex=""></span><md-button ng-click="answer(\'not useful\')">Not Useful</md-button><md-button ng-click="answer(\'useful\')" style="margin-right:20px;">Useful</md-button></md-dialog-actions></form></md-dialog>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" class="md-primay hue-2"><div class="md-toolbar-tools"><md-button class="md-icon-button material-icons" aria-label="menu" ng-click="toggle()">menu</md-button></div></md-toolbar>'),t.put("app/components/sidenav/sidenav.html",'<md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left"><md-toolbar class="md-theme-indigo"><h1 class="md-toolbar-tools">Menu</h1></md-toolbar><md-content layout-padding=""><md-button ng-click="toggle()" class="md-primary">Close Sidenav Left</md-button></md-content></md-sidenav>')}]);
//# sourceMappingURL=../maps/scripts/app-ea50dbadb8.js.map