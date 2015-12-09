// Populate from AJAX:
    db.on('ready', function () {
        // on('ready') event will fire when database is open but
        // before any other queued operations start executing.
        // By returning a Promise from this event,
        // the framework will wait until promise completes before
        // resuming any queued database operations.
        // Let's start by using the count() method to detect if
        // database has already been populated.
        return db.someTable.count(function (count) {
            if (count > 0) {
                console.log("Already populated");
            } else {
                console.log("Database is empty. Populating from ajax call...");
                // We want framework to continue waiting, so we encapsulate
                // the ajax call in a Dexie.Promise that we return here.
                return new Dexie.Promise(function (resolve, reject) {
                    $.ajax(url, {
                        type: 'get',
                        dataType: 'json',
                        error: function (xhr, textStatus) {
                            // Rejecting promise to make db.open() fail.
                            reject(textStatus);
                        },
                        success: function (data) {
                            // Resolving Promise will launch then() below.
                            resolve(data);
                        }
                    });
                }).then(function (data) {
                    console.log("Got ajax response. We'll now add the objects.");
                    // By returning the db.transaction() promise, framework will keep
                    // waiting for this transaction to commit before resuming other
                    // db-operations.
                    return db.transaction('rw', db.someTable, function () {
                        data.someInitArrayOfObjects.forEach(function (item) {
                            console.log("Adding object: " + JSON.stringify(item));
                            db.someTable.add(item);
                        });
                    });
                }).then(function () {
                    console.log ("Transaction committed");
                });
            }
        });
    });
