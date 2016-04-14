var elasticsearch = require('elasticsearch');
var fs = require('fs');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

var index = 'twitter_geolocations';
var type = 'tweet';
var file = 'dump';

function index_es(body_) {
    if (body_.geo == null) {
        return;
    }
    console.log('found location');
    client.index({
        index: index,
        id: get_id(body_),
        type: type,
        body: body_
    }, function(error, response) {
        console.log(error);
    });
}

function get_id(tweet) {
    return tweet.id;
}

var obj = JSON.parse(fs.readFileSync('dump', 'utf8'));

for (var i = 0; i < obj.hits.hits.length; i++) {
	// console.log(obj.hits.hits[i]._source);
	index_es(obj.hits.hits[i]._source);
}