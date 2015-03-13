/**
 * Created by Administrator on 2015/3/12.
 */
//var Db = require('./db');
var settings = require('../settings');
var Db = require('mongodb').Db
var poolModule = require('generic-pool');
var mongoPool = poolModule.Pool({
    name     : 'mongoPool',
    create   : function(callback) {
        var mongodb = Db;
        mongodb.connect(settings.mongodb.url, function (err, db) {
            callback(err, db);
        })
    },
    destroy  : function(db) {
        db.close();
    },
    max      : 100,
    min      : 5,
    idleTimeoutMillis : 30000,
    log      : true
});

module.exports = mongoPool;
