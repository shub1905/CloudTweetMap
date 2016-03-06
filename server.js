var express = require('express');
var app = express();
var es = require('./elasticsearch_model');
var twit = require('./twitter.js');


app.use(express.static('public'));
var hasht = ['VoteTrump','MakeAmericaGreatAgain','Trump2016'];
var hashtl = ['MakeDonaldDrumpfAgain','DonaldDrumpf','neverTrump'];
var hashb = ['FeelTheBurn', 'Bernie2016'];
var hashh = ['Hilary2016', 'IAmWithHer'];

app.get('/api/getAllTweets/hilary', function(req, res) {
    var data = es.search(hashh, res);
    console.log('hilary');
});

app.get('/api/getAllTweets/bernie', function(req, res) {
    var data = es.search(hashb, res);
    console.log('bernie');
});

app.get('/api/getAllTweets/trump', function(req, res) {
    var data = es.search(hasht, res);
    console.log('trump');
});

app.get('/api/getAllTweets/trump_loser', function(req, res) {
    var data = es.search(hashtl, res);
    console.log('trump anti');
});

app.get('/api/getAllTweets/elections', function(req, res) {
    var data = es.search_all(res);
    console.log('general');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});