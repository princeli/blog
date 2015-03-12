/**
 * Created by Administrator on 2015/3/12.
 */
var Db = require('./db');
var poolModule = require('generic-pool');
var mongoPool = poolModule.Pool({
    name     : 'mongoPool',
    create   : function(callback) {
        var mongodb = Db();
        mongodb.open(function (err, db) {
            callback(err, db);
        })
    },
    destroy  : function(mongodb) {
        mongodb.close();
    },
    max      : 100,
    min      : 5,
    idleTimeoutMillis : 30000,
    log      : true
});

module.exports = mongoPool;
