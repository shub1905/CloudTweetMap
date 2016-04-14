var Twit = require('twit');
var fs = require('fs');
var http = require('http');
var aws = require('aws-sdk');

var config_raw = fs.readFileSync('config.json');
var config_json = JSON.parse(config_raw);
var config_twitter = config_json.twitter;
var queueUrl = config_json.aws.queueUrl;

aws.config.loadFromPath('./aws_config.json');
var sqs = new aws.SQS();

var T = new Twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret,
    timeout_ms: config.timeout
})

// var stream = T.stream('statuses/filter', { track: '#VoteTrump,#MakeAmericaGreatAgain,#MakeAmericaGrateAgain,#Trump2016,#MakeDonaldDrumpfAgain,#DonaldDrumpf,#FeelTheBern,#Bernie2016,#Hilary2016,#IAmWithHer,#Elections2016,#GOPDebate,#repulican,#democrat,#HilarySoQualified,trump,bernie,hilary,president,elections,nuclear' });
var stream = T.stream('statuses/filter', { locations: [-180, -85, 180, 85] });
// var stream = T.stream('statuses/filter', { locations: [-122.75,36.8,-121.75,37.8] });

stream.on('tweet', function(tweet, error) {
    if (tweet.geo != null) {
        var params = {
            MessageBody: JSON.stringify(tweet),
            QueueUrl: queueUrl
        };
        sqs.sendMessage(params, function(err, data) {
            if (err) common.logError(err, err.stack); // an error occurred
            else common.log(data); // successful response
        });
    }
});