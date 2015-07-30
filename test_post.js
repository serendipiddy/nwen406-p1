var senda = function (data) {
  var request = require('request');
  var data = {
    value:'the beginning value',
    count: 0,
    audit:{},
    order:[
      '52.27.64.194',
      '52.27.64.194',
      '52.27.64.194'
    ]
  };
  
  var dest = "52.27.64.194";
  var url = "http://"+dest+"/api"; // pop from order

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
    
}



var passObject = function (data) {
  var request = require('request');
  console.log('(passingObject)');
  
  if (data.order.length <= 0) {
    console.log('(finished) use GET to retrieve data');
    return;
  }
  
  
  var lock = true;
  /* get destination from data.order[] */
  var dest = data.order.shift();
  var url = "http://"+dest+"/test";  // var dest = "52.27.64.194";

  console.log('(sending) attempt to '+url+' left:'+data.order.length);
      
  request.post(
    url, 
    {json: data},  
    function(err, res, body) { // resp is from POST
      if (!err && res.statusCode == 200) {
        console.log('(sending) successful');
      }
      else {console.log('err:'+err);}
      lock = false;
    });
};

var pass = function(data) {
  // check dest
    // if an address is left 
      // try three times until success
        
    // else, 
      // nowhere left to send, dump JSON.

}
 /* Tries to send data to destination.
  On the third attempt, skips the current address. */
var tryToSend = function(data, dest, attempt) {
  if (attempt > 2) nextDest(data);
  else {
    var request = require('request');
    console.log('(sending) attempt:'+attempt);
    request.post(
      dest, 
      {json: data},  
      function(err, res, body) { // resp is from POST
        if (!err && res.statusCode == 200) {
          console.log('(sending) successful');
          console.log('(response) '+body);
        }
        else {console.log('(sending) err: '+err);}
      });
  };
}
/* slides the next address, then tries to send. 
  If no address dumps JSON*/
var nextDest = function (data) {
  if (data.order.length > 0) {
    var dest = data.order.shift();
    var url = "http://"+dest+"/test";  // var dest = "52.27.64.194";
    attempt = 0;
    
    console.log('(sending) next dest:'+url);
    tryToSend(data, url, attempt);
  }
  else {
    console.log('(sending) no next address');
    dumpCurrentJSON(data);
  }
}

/* Completes a sending sequence. Making the
  JSON data available through a web interface. */
var dumpCurrentJSON = function(data) {
  console.log('(complete)');
  console.log(JSON.stringify(data, null, 2));
}

var data = {
    value:'the test value',
    count: 0,
    audit:{},
    order:[
      '52.27.64.194',
      '52.27.64.12',
      '52.27.64.194'
    ]
  };
nextDest(data);
