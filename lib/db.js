/**
 * Created by Administrator on 2015/3/9.
 */
var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = function() {
    return new Db(settings.mongodb.db, new Server(settings.mongodb.host, settings.mongodb.port), {safe: true, poolSize: 1});
}
