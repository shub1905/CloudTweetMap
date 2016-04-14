// var AlchemyAPI = require('./alchemyapi');
// var alchemyapi = new AlchemyAPI();


// function sentiment_analysis(msg) {
//     alchemyapi.sentiment("text", msg, {}, function(response) {
//         if (response.status == 'OK') {
//             console.log("Sentiment: " + response["docSentiment"]["type"]);
//         }
//     });
// }

// sentiment_analysis('Omg. no.');
var aws = require('aws-sdk');
var sns = new aws.SNS();
console.log(sns);
aws.config.loadFromPath('./aws_config.json');
aws.config.update({ 'region': 'us-east-1' });

sns.subscribe({
    'TopicArn': 'arn:aws:sns:us-east-1:721912020616:tweets_sns',
    'Protocol': 'http'
}, function(err, result) {

    if (err !== null) {
        console.log(err);
        return;
    }

    console.log(result);

});