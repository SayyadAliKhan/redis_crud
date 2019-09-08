var redis = require('redis');
const nconf = require('nconf');

// read in keys and secrets. You can store these in a variety of ways.
// I like to use a keys.json file that is in the .gitignore file,
// but you can also store them in environment variables
nconf
  .argv()
  .env()

// [START gae_flex_node_redis]
// Connect to a redis server provisioned over at
// Redis Labs. See the README for more info.
const client = redis
  .createClient(
    nconf.get('redisPort') || '6379',
    nconf.get('redisHost') || nconf.get('host') || nconf.get('Host') || '127.0.0.1',
  )
  .on('error', err => console.error('ERR:REDIS:', err));

module.exports = client;
