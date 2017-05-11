var express = require('express');
var bodyParser = require('body-parser');
//var cors = require('cors');
var http = require('http');
var path = require('path');
var twit = require('twitter');
var app = express();
var port = process.env.PORT || 3000;
require('dotenv').config()
var twitter = new twit({
  consumer_key:  process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
app.set('port', (port));
var server = http.createServer(app).listen(port, function() {
  console.log('Server listening on port ' + port);
});
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.get('/gettweets', function (req, res) {
  twitter.get('statuses/user_timeline', { id: 2835226509, count: 3 }, function(err, tweets, response) {
      if (!err) {
         res.json(tweets);
      }
      else {
        return res.status(500).json({
          title: 'An error has occured',
          error: err
        })
      }
    })
})
