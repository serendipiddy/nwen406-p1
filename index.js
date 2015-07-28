var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.static('html')); // serving out static files in directory 'html' 

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

/* bind and listen for connections */
var server = app.listen(8080, function() {
  console.log('Listening on port %d', server.address().port);
});