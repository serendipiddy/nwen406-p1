// var books = ["poe","gulliver","pride","siddhartha"];

var rf = function(book_num, hash) {
  var fs = require('fs');
  // var crypto = require(__dirname+'/md5.js');
  var read = "";

  var m = require('md5');
  
  filename = __dirname+'/text/pride.txt';
  console.log("file: "+filename);
  
  console.log(hash);
  
  var buf = fs.readFileSync(filename, {encoding: 'utf-8'});
  read = buf.substring(0,100);
  
  sp = buf.replace(/[^a-zA-Z\n]/g, "").split(/[\n]/);
  
  lens = [];
  min = 100;
  max = 0;
  sum = 0;
  count = 0;
  hist = new Array(73);
  for (var i = 0; i < hist.length; i++) hist[i] = 0
  for (var i = 0; i < sp.length; i++) {
    l = sp[i].length;
    lens.push(l);
    if (l<min) min = l;
    if (l>max) max = l;
    sum += l;
    hist[l]++;
    if(l == 64) console.log(i+" "+sp[i]);
  }

  console.log(JSON.stringify({
    max: max,
    min: min,
    average: sum/lens.length,
  },null, 2));
  // hist.forEach(function(d) {console.log(d);});
  
  // read = read.replace(/[^a-zA-Z]/g, "");
};

/* Reading in a local text file */
var readFile = function(lines) {
  var fs = require('fs');
  filename = __dirname+'/text/pride.txt';
  var buf = fs.readFileSync(filename, {encoding: 'utf-8'});
  var sp = buf.replace(/[^a-zA-Z\n]/g, "").split(/[\n]/);
  
  var rv = "";
  for (var i = 0; i<lines.length; i++) {
    // console.log(lines[i]+" "+sp[lines[i]]);
    rv+=(sp[lines[i]]);
  }
  return rv;
};

/* Hashes the string to X digit number, which are 
  coordinates for finding text in one of books */
var hash = function (input_string) {
  var md5 = require('md5');
  h = md5(input_string);
  return h;
}

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
      console.log("l: "+l+" offset: "+i);
    }
    lines.push(l % line_num);
    h_idx += 8;
  }
  
  return readFile(lines);
}

// readFile(2, [29,2]);
console.log(manipulateData("yiyin", 10658));