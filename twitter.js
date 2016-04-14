var Twit = require('twit');
var fs = require('fs');
var http = require('http');
var aws = require('aws-sdk');
var sqs_sns = require('./aws_sqs_sns.js')

var config_raw = fs.readFileSync('config.json');
var config_json = JSON.parse(config_raw);
var config = config_json.twitter;
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
var stream = T.stream('statuses/filter', { locations: [-180, -85, 180, 85], language: 'en'});
// var stream = T.stream('statuses/filter', { locations: [-122.75,36.8,-121.75,37.8] });

stream.on('tweet', function(tweet, error) {
    if (tweet.geo != null) {
        var params = {
            MessageBody: JSON.stringify(tweet),
            QueueUrl: queueUrl
        };
        sqs.sendMessage(params, function(err, data) {
            if (err) console.log('Errror:' + err); // an error occurred
            else console.log('Sent to SQS'); // successful response
        });
    }
});

sqs_sns.st();