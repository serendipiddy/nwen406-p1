var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.static('html')); /* serving out static files in directory 'html' 
                                    will use to serve a D3 animation, if time.
                                    Perhaps also a POST-ing page. */

var books = ["poe","gulliver","pride","siddhartha"];
var lengthOfBook = [7898,8463,10658,3337];

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
  
  console.log('(new) JSON Received') // :\n'+JSON.stringify(req.body, null, 2));
  res.statusCode = 200; // status ok
  res.json({
    received:"Valid JSON :D"
  });
  
  processData(req.body);
});



app.get('/api', function (req, res) {
  return res.send('/api says: "GOT: <3 <(\'\'<)\n Oh noes! You should be using POST .OTL');
});

/* bind and listen for connections */
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

var processData = function(data) {
  // var result = false;
  
  var name = 'jordan';
  // var index = data.count++;
  var audit = {};
  audit.input = data.value;
  audit.index = data.count++;
  console.log('(input) '+audit.input);
  
  /* Do my playing */
  console.log('('+audit.input+') Manipulating');
  var mand = manipulateData(data.value, lengthOfBook[2]);
  console.log('('+audit.input+') Output: '+mand);
  audit.output = mand;
  data.value = mand;
  
  // set last
  var date = new Date();
  audit.time = date;
  
  // preserve count
  
  data.audit[name] = audit;
  passObject(data);
}

/* Gets four lines from Pride and Prejudice
  The lines are determined using 16 byte 
  hash of the input */
var manipulateData = function(input, line_num) {
  var h = hash(input);
  var h_idx = 0;
  
  console.log(h);
  
  var lines = [];
  var l = 0;
  while (h_idx < h.length) {
    l += parseInt(h.substring(h_idx,h_idx+4),16);
    for (var i = 4; i < 8; i+=2) {
      // l += parseInt(h.charAt(h_idx+i),16);
      l += parseInt(h.substring(h_idx+i,h_idx+i+2),16);
      // console.log("l: "+l+" offset: "+i);
    }
    lines.push(l % line_num);
    h_idx += 8;
  }
  
  return readFile(lines);
}

/* Reading in a local text file
  Returns 255 characters from text. */
var readFile = function(lines) {
  var fs = require('fs');
  filename = __dirname+'/text/'+books[2]+'.txt';
  var buf = fs.readFileSync(filename, {encoding: 'utf-8'});
  var sp = buf.replace(/[^a-zA-Z\n ]/g, "").split(/[\n]/);
  
  var rv = "";
  for (var i = 0; i<lines.length; i++) {
    // console.log(lines[i]+" "+sp[lines[i]]);
    var words = sp[lines[i]].replace(/[^a-zA-Z\n ]/g, "").split(" ");
    for (var j = 0; j<words.length && j<5; j++) {
      rv += words[j];
    }
  }
  return rv.substring(0,256);
};

/* Hashes the string to X digit number, which are 
  coordinates for finding text in one of books */
var hash = function (input_string) {
  var md5 = require('md5');
  h = md5(input_string);
  return h;
}

/* Passes object on to next node
  If next node does not respond, that node is skipped 
  return: 
    true  - if this managed to send
    false - implies all nodes are skipped */
var passObject = function (data) {
  var request = require('request');
  
  var result = false; 

  /* pop destination from order */
  var dest = data.order.pop();
  
  // var dest = "52.27.64.194";
  var url = "http://"+dest+"/api"; 

  console.log('SENDING'
      +'\nto:   '+url
      // +'\ndata: \n'+JSON.stringify(data));
      +'\ndata: \n'+JSON.stringify(data, null, 2));
      
  request.post(
    url, 
    {json: data},  // NO: {json: JSON.stringify(data)},
    function(err, res, body) { // resp is from POST
      if (!err && res.statusCode == 200) {
        console.log('success:\n'+body);
      }
      else {
        console.log('err:'+err);
      }
    });
    
  return result;
}
