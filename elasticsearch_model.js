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
        // console.log(hits[i]);
        data_new.push({ "lat": hits[i]._source.geo.coordinates[0], "long": hits[i]._source.geo.coordinates[1] });
    }
    return data_new;
}

function search(hashtaglist, res) {
    var new_hashes = [];

    for (var i = 0; i < hashtaglist.length; i++) {
        new_hashes.push(hashtaglist[i].toLowerCase());
    }

    var query = query_default;
    query.query.terms = { 'entities.hashtags.text': new_hashes };
    var ret_value;

    client.search({
        index: index,
        body: query
    }, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            res.send(es_response_data_list(response));
        }
    });
}

function search_all(res) {
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
        if (error) {
            console.log(error);
        } else {
            res.send(es_response_data_list(response));
        }
    });
}

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

module.exports.search = search;
module.exports.index = index_es;