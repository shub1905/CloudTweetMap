var Twit = require('twit');
var fs = require('fs');
var http = require('http');
var es = require('./elasticsearch_model.js');

var config_raw = fs.readFileSync('config.json');
var config = JSON.parse(config_raw).twitter;


var T = new Twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret,
    timeout_ms: config.timeout
})

var stream_simple = T.stream('statuses/sample');
var stream = T.stream('statuses/filter', { track: '#MakeAmericaGreatAgain' });

stream.on('tweet', function(tweet, error) {
	console.log(error);
	console.log('filter');
    es.index(tweet);
});

stream_simple.on('tweet', function(tweet, error) {
	console.log(error);
    console.log('simple');
    es.index(tweet);
});