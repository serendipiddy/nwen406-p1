var books = ["poe","gulliver","pride","siddhartha"];

var readFile = function(book_num, hash) {
  var fs = require('fs');
  var read = "";
  if (book_num < books.length && book_num >= 0) {
    filename = __dirname+'/text/'+books[book_num]+'.txt';
    console.log("file: "+filename);
    fs.readFile(filename, {encoding: 'utf-8'}, function(err, data) {
      read = data.substring(0,1000);
      
      read = read.replace(/[^a-zA-Z]/g, "");
      
      console.log("book: "+read);
    });
  }
  console.log("outside"+read); // doesn't work.. grr 
};

readFile(2, [29,2]);