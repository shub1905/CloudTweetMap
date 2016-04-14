var express = require('express');
var es = require('./elasticsearch_model');
var twit = require('./twitter.js');
var aws = require('aws-sdk');
var bodyParser = require('body-parser');

var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);


app.use(express.static('public'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var hasht = ['VoteTrump', 'MakeAmericaGreatAgain', 'Trump2016', 'MakeDonaldDrumpfAgain', 'DonaldDrumpf', 'neverTrump', 'trump'];
var hashb = ['FeelTheBern', 'Bernie2016', 'bernie'];
var hashh = ['Hilary2016', 'IAmWithHer', 'hillary'];


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

app.get('/api/getAllTweets/elections', function(req, res) {
    var data = es.search_all(res);
    console.log('general');
});

app.get('/index', function(req, res) {
    console.log('Finally someone found me');
});

// io.on('connection', function(socket){
//   socket.on('twitter-stream', function(msg){
//     io.emit('twitter-stream', msg);
//   });
// });


// app.post('/snspost', function(req, res) {
//     console.log('Finally someone found me');
//     console.log(req.body.SubscribeURL);
//     console.log(req.body);
//     // console.log(req)
//     console.log(req.headers);
// });

// app.post('/receive', client);

// var listener = app.listen(process.env.PORT, function() {
var listener = app.listen(9999, function() {
    console.log('Example app listening on port:' + listener.address().port);
});