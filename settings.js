/**
 * Created by Administrator on 2015/3/9.
 */
/**
module.exports.mongodb = {
    cookieSecret: 'myblog',
    db: 'blog',
    host: 'localhost',
    port: 27017

};
**/

module.exports.mongodb = {
    cookieSecret: 'myblog',
    url: 'mongodb://admin:123456@ds030817.mongolab.com:30817/blog'
};

module.exports.redisdb = {
    cookieSecret: 'myblog',
    db: 'blog',
    host: 'pub-redis-13935.us-east-1-4.2.ec2.garantiadata.com',
    port: 13935,
    pass:"123456",
    ttl:1800
};
