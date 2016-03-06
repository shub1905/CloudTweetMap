var express = require('express');
var app = express();
var es = require('./elasticsearch_model');


app.use(express.static('public'));
var hasht = ['VoteTrump','MakeAmericaGreatAgain','Trump2016'];
var hashb = ['FeelTheBurn', 'Bernie2016'];
var hashh = ['Hilary2016', 'IAmWithHer'];

app.get('/api/getAllTweets/hilary', function(req, res) {
    var data = es.search(hashh);
    console.log('hilary');
    res.send(data);
});

app.get('/api/getAllTweets/bernie', function(req, res) {
    var data = es.search(hashb);
    console.log('bernie');
    res.send(data);
});

app.get('/api/getAllTweets/trump', function(req, res) {
    var data = es.search(hasht);
    console.log('trump');
    res.send(data);
});

app.get('/api/getAllTweets/general', function(req, res) {
    var data = es.search_all('*');
    console.log('general');
    res.send(data);
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});