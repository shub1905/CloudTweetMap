var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

var index = 'twitter_geolocations';
var type = 'tweet';

var query_default = {
    "size": 1000,
    "query": {
        "terms": {
            "entities.hashtags.text": []
        }
    }
}

function es_response_data_list(data) {
    var hits = data.hits.hits;
    var data_new = [];
    for (var i = 0; i < hits.length; i++) {
        data_new.push({"lat":hits[i].geo.coordinates[0], "long": hits[i].geo.coordinates[1]}})
    }
    return data_new;
}

function search(hashtaglist) {
    var new_hashes = [];

    for (var i = 0; i < hashtaglist.length; i++) {
        new_hashes.push(hashtaglist[i].toLowerCase());
    }
    console.log(new_hashes);

    var query = query_default;
    query.query.terms = { 'entities.hashtags.text': new_hashes };
    console.log(query.query.terms);

    client.search({
        index: index,
        body: query
    }, function(error, response) {
        console.log(response);
    });
}

function search_all() {
    var query = {
        "size": 2000,
        "query": {
            "match_all": {}
        }
    }
    client.search({
        index: index,
        body: query
    }, function(error, response) {
        console.log(response);
        console.log(error);
    });
}

function index_es(body_) {
    if (body_.geo == null)
    {
        console.log('missing location');
        return;
    }
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

module.exports.search = search;
module.exports.index = index_es;

search(['VoteTrump', 'MakeAmericaGreatAgain', 'Trump2016']);