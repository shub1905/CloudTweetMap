var Twit = require('twit');
var fs = require('fs');

var config_raw = fs.readFileSync('config.json');
var config = JSON.parse(config_raw).twitter;


var T = new Twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret,
    timeout_ms: config.timeout
})

var stream = T.stream('statuses/sample')

stream.on('tweet', function (tweet) {
  console.log(tweet)
})