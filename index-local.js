var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.static('html')); /* serving out static files in directory 'html' 
                                    will use to serve a D3 animation, if time.
                                    Perhaps also a POST-ing page. */

var books = ["poe","gulliver","pride","siddhartha"];
var lengthOfBook = [7898,8463,10658,3337];
var latestData = {latest: 'none'};
var status200 = 202; // HTTP status used by the API

/* RESTful calls */
app.get('/alive',function(req,res) {
  res.send('alive');
});

app.get('/test', function(req, res) {
  res.send("Hello :)");
});

app.post('/test', function(req, res) {
  if (!req.body.hasOwnProperty('value')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }
  console.log("(test-Recieved) \""+req.body.value+"\"");
  res.statusCode = status200;
  res.send('Received by <home-ip> (Jordan)');
  latestData = req.body;
  console.log(req.body);
});

app.post('/api', function (req, res) {
  if (!req.body.hasOwnProperty('value') 
    || !req.body.hasOwnProperty('count') 
    || !req.body.hasOwnProperty('audit') 
    || !req.body.hasOwnProperty('order')) {
    res.statusCode = 400;
    return res.send({
      received:"Invalid JSON D:!"
    });
    // return res.send('Error 400: POST syntax incorrect.');
  }
  
  var theTime = new Date();
  console.log('(new JSON) '+new Date(theTime).toGMTString());
  res.statusCode = status200; // status ok
  res.send('Received by <home-ip> (Jordan)');
  
  processData(req.body,theTime);
});

app.get('/api', function (req, res) {
  return res.json(latestData);
    // '<html><body>/api says: "GOT: <3 <(\'\'<)\n Oh noes! You should be using POST .OTL'+
    // JSON.stringify(latestData,null,2)+'</body></html>');
});

/* bind and listen for connections */
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

var processData = function(data, time) {
  // var result = false;
  
  var name = 'jordan';
  // var index = data.count++;
  var audit = {};
  audit.input = data.value;
  audit.index = data.count++;
  audit.time = new Date(time).toUTCString();
  console.log('(processing) Input: '+audit.input);
  
  /* Do my playing */
  // console.log('('+audit.input.substring(0,10)+') Manipulating');
  var book = 1;
  var mand = manipulateData(data.value, book);
  console.log('(processing) Output: '+mand);
  audit.output = mand;
  data.value = mand;
  
  console.log('(processing) attaching audit');
  data.audit[name] = audit;
  // latestData = data;
  
  /* Send to next */
  nextDest(data);
}

/* Gets four lines from Pride and Prejudice
  The lines are determined using 16 byte 
  hash of the input */
var manipulateData = function(input, book) {
  var h = hash(input);
  var h_idx = 0;
  
  var lines = [];
  var l = 0;
  while (h_idx < h.length) {
    l += parseInt(h.substring(h_idx,h_idx+4),16);
    for (var i = 4; i < 8; i+=2) {
      l += parseInt(h.substring(h_idx+i,h_idx+i+2),16);
    }
    lines.push(l % lengthOfBook[book]);
    h_idx += 8;
  }
  
  console.log('(processing) lines {'+lines.toString()+'} of \''+books[book]+'\'');
  return readLines(lines,book);
}

/* Read the given lines from a given book number
  Returns 50 characters from the text. */
var readLines = function(lines,book) {
  var fs = require('fs');
  filename = __dirname+'/text/'+books[book]+'.txt';
  var buf = fs.readFileSync(filename, {encoding: 'utf-8'});
  var sp = buf.replace(/[^a-zA-Z \n]/g,"").split(/[\n]/);
  
  var rv = "";
  for (var i = 0; i<lines.length; i++) {
    var words = sp[lines[i]].split(" ");
    for (var j = 0; j<words.length && j<4; j++) {
      rv += words[j];
    }
  }
  return rv.substring(0,50);
};

/* Hashes the string to X digit number, which are 
  coordinates for finding text in one of books */
var hash = function (input_string) {
  var md5 = require('md5');
  h = md5(input_string);
  return h;
}

 /* Tries to send data to destination.
  On the third attempt, skips the current address. */
var tryToSend = function(data, dest, attempt) {
  if (attempt > 2) 
    nextDest(data);
  else {
    var request = require('request');
    console.log('(sending)  '+dest+' attempt #'+attempt);
    request.post(
      dest, 
      {json: data},  
      function(err, res, body) { // resp is from POST
        if (!err && res.statusCode == status200) {
          console.log('(sending)  '+dest+': successful');
          console.log('(response) '+dest+' '+body);
          console.log('(complete) '+dest);
        }
        else {
          console.log('(sending)  '+dest+' err: '+err);
          tryToSend(data,dest,attempt+1);
        }
      });
  };
}

/* Pops ('slides') the next address, then attempts to send. 
  If there's no next address, dumps the final JSON*/
var nextDest = function (data) {
  if (data.order.length > 0) {
    var dest = data.order.shift();
    var url = "http://"+dest+"/api"; 
    attempt = 0;
    
    console.log('(sending) next dest: '+url);
    tryToSend(data, url, attempt);
  }
  else {
    console.log('(end) No next address');
    dumpCurrentJSON(data);
  }
}

/* Completes a sending sequence. Makes the
  JSON data available through: GET .../api */
var dumpCurrentJSON = function(data) {
  console.log('(complete) Final JSON:');
  latestData = data;
  console.log(JSON.stringify(data, null, 2));
}