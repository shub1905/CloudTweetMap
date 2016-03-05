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
        type: type,
        body: body_
    }, function(error, response) {});
}

body = {
    title: 'Test',
    tags: ['y', 'z'],
    published: true,
}

for (var i = 0; i < 10; i++) {
	body_temp = body;
	body_temp.title = body_temp.title + i.toString();
    index_es(body);
}

search('*');