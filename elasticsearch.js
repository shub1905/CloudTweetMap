var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});

client.search({
  index: 'twitter',
  q: '*'
}, function (error, response) {
  console.log(response.hits.hits[0]);
});