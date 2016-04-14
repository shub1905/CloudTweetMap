var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();


function sentiment_analysis(msg) {
    alchemyapi.sentiment("text", msg, {}, function(response) {
        if (response.status == 'OK') {
            console.log("Sentiment: " + response["docSentiment"]["type"]);
        }
    });
}

sentiment_analysis('Omg. no.');