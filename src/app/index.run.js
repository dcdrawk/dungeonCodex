(function() {
    'use strict';

    angular
        .module('dc')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, dbService) {

        var db = dbService.newDB();
        // dbService.deleteDB(db);
        db.on("populate", function() {
            dbService.populateDB(db);
        });

        //End of run block
        $log.debug('runBlock end');

    }

})();
