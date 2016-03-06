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

var stream = T.stream('statuses/filter', { track: '#VoteTrump,#MakeAmericaGreatAgain,#Trump2016,#MakeDonaldDrumpfAgain,#DonaldDrumpf,#FeelTheBurn,#Bernie2016,#Hilary2016,#IAmWithHer,#Elections2016,#GOPDebate,#repulican,#democrat' });

stream.on('tweet', function(tweet, error) {
    es.index(tweet);
});