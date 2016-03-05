var Twit = require('twit')

var T = new Twit({
    consumer_key: "values",
    consumer_secret: "values",
    access_token: "values",
    access_token_secret: "values",
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
})

var stream = T.stream('statuses/sample')

stream.on('tweet', function (tweet) {
  console.log(tweet)
})