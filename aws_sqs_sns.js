var aws = require('aws-sdk');
var fs = require('fs');
var Consumer = require('sqs-consumer');
var AlchemyAPI = require('./alchemyapi.js');
var elastic = require('./elasticsearch_model.js');



var alchemyapi = new AlchemyAPI();

function sentiment_analysis(tweet_txt) {
    alchemyapi.sentiment("text", tweet_txt, {}, function(response) {
        console.log("Sentiment: " + JSON.stringify(response["docSentiment"]["type"]));
        return response["docSentiment"]["type"];
    });
}


var config_raw = fs.readFileSync('config.json');
var config_json = JSON.parse(config_raw);

var app = Consumer.create({
    queueUrl: config_json.aws.queueUrl,
    // region: 'us-east-1',
    batchSize: 10,
    handleMessage: function(message, done) {
        var tweet = JSON.parse(message.Body);
        sentiment_analysis(tweet);
        return done();
    }
});

app.on('error', function(err) {
    console.log(err);
});


function consumer_sqs_start() {
    app.start();
}

function consumer_sqs_close() {
    app.stop();
}