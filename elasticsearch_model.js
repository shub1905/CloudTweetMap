var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

var index = 'twitter';
var type = 'tweet';

function search(query) {

    client.search({
        index: index,
        q: query
    }, function(error, response) {
        console.log(response);
    });
}

function index_es(body_) {
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

search('*');