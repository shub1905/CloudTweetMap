var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/api/getAllTweets/hilary', function(req, res) {
	console.log('hilary');
});

app.get('/api/getAllTweets/bernie', function(req, res) {
	console.log('bernie');
});

app.get('/api/getAllTweets/trump', function(req, res) {
	console.log('trump');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});