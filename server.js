var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/maps.html');
});

app.post('/api', function(req, res) {
    res.send('Got a POST request');
});

app.put('/user', function(req, res) {
    res.send('Got a PUT request at /user');
});

app.delete('/user', function(req, res) {
    res.send('Got a DELETE request at /user');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});