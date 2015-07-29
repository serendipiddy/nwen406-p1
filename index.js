var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.static('html')); /* serving out static files in directory 'html' 
                                    will use to serve a D3 animation, if time.
                                    Perhaps also a POST-ing page. */

var books = ["poe","gulliver","pride","siddhartha"];

/* RESTful calls */
app.get('/test', function(req, res) {
  res.send("Hello :)");
});

app.post('/test', function(req, res) {
  if (!req.body.hasOwnProperty('name')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }
});

app.post('/api', function (req, res) {
  console.log(req.body);
  res.statusCode = 200; // status ok
  return res.send();
});

/* bind and listen for connections */
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

/* Reading in a local text file */
var readFile = function(file_num, hash) {
  var fs = require('fs');
  if (file_num < books.length && file_num >= 0) {
    fs.readFile(books[file_num], {encoding: 'utf-8'}, function(err, data) {
      console.log( data
    });
  }
}

/* Hashes the string to X digit number, which are 
  coordinates for finding text in one of books */
var hash = function (input_string) {
  return input_string;
}