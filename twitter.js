var Twit = require('twit');
var fs = require('fs');
var http = require('http');
//var es = require('./elasticsearch_model.js');
var aws = require('aws-sdk');
var queueUrl = ""

var config_raw = fs.readFileSync('config.json');
var config = JSON.parse(config_raw).twitter;

aws.config.loadFromPath(./aws_config.json);

var sqs = aws.SQS();
var params = {
  QueueName: "tweets"
};

sqs.createQueue(params, function(err, data) {
   if (err)
	console.log(err, err.stack); // an error occurred
   else     
	console.log(data);           // successful response
 /*  
   data = {
    QueueUrl: "https://queue.amazonaws.com/012345678910/MyQueue"
   }
*/   
 });

var params = {
  QueueName: 'tweets'
};
sqs.getQueueUrl(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else    {
 queueUrl = data;	
 console.log(data);           // successful response
}

});

var T = new Twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret,
    timeout_ms: config.timeout
})

var stream = T.stream('statuses/filter', { track: '#VoteTrump,#MakeAmericaGreatAgain,#MakeAmericaGrateAgain,#Trump2016,#MakeDonaldDrumpfAgain,#DonaldDrumpf,#FeelTheBern,#Bernie2016,#Hilary2016,#IAmWithHer,#Elections2016,#GOPDebate,#repulican,#democrat,#HilarySoQualified,trump,bernie,hilary,president,elections,nuclear' });

stream.on('tweet', function(tweet, error) {
    if(tweet.geo!=null) {
    var params = {
    MessageBody: JSON.stringify(tweet),
    QueueUrl: queueUrl
  };
  sqs.sendMessage(params, function(err, data) {
    if (err) common.logError(err, err.stack); // an error occurred
    else     common.log(data);           // successful response
  });  
}
    //es.index(tweet);
}
});
