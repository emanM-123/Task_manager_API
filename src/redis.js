/* eslint-disable no-console */
import redis from 'redis';
import bluebird from 'bluebird';
import development from '../config';
import production from '../config';

const Config = process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? production : development;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export const GlobalRedisClient = redis.createClient(Config.redis);

GlobalRedisClient.select(Config.redis.globalDb.charAt(1), function() { /* ... */ });

/*GlobalRedisClient.on('ready',function() {
    console.log('Global Redis is ready');
});*/

GlobalRedisClient.on('error', function (err) {
  console.log('Global Redis Error ' + err);
});

export const PublishRedisClient = redis.createClient(Config.redis);

/*PublishRedisClient.on('ready',function() {
    console.log('Publish Redis is ready');
});*/

PublishRedisClient.on('error', function (err) {
  console.log('Publish Redis Error ' + err);
});

export const LocalRedisClient = redis.createClient(Config.redis);

LocalRedisClient.select(Config.redis.localDb.charAt(1), function() { /* ... */ });

/*LocalRedisClient.on('ready',function() {
    console.log('Local Redis is ready');
});*/

LocalRedisClient.on('error', function (err) {
  console.log('Local Redis Error ' + err);
});

export const subscribeRedisClient = redis.createClient(Config.redis);

subscribeRedisClient.select(Config.redis.localDb.charAt(1), function() { /* ... */ });

/*LocalRedisClient.on('ready',function() {
    console.log('Local Redis is ready');
});*/

subscribeRedisClient.on('error', function (err) {
  console.log('Local Redis Error ' + err);
});

export const publishNewRedisClient = redis.createClient(Config.redis);

publishNewRedisClient.select(Config.redis.localDb.charAt(1), function() { /* ... */ });

/*LocalRedisClient.on('ready',function() {
    console.log('Local Redis is ready');
});*/

publishNewRedisClient.on('error', function (err) {
  console.log('Local Redis Error ' + err);
});
