var senda = function (data) {
  var request = require('request');
  
  var url = "http://52.27.64.194/api"; // pop from order

  console.log('SENDING'
      +'\nto:   '+url
      // +'\ndata: \n'+JSON.stringify(data));
      +'\ndata: \n'+JSON.stringify(data, null, 2));
      
  request.post(
    url, 
    {json: data},  // NO: {json: JSON.stringify(data)},
    function(err, res, body) { // resp is from POST
      if (!err && res.statusCode == 202) {
        console.log('success:\n'+body);
      }
      else {
        console.log('err:'+err);
      }
    });
    
}


/* Used to figure out steps and functions to use */
var pass = function(data) {
  // check dest
    // if an address is left 
      // try three times until success
        
    // else, 
      // nowhere left to send, dump JSON.

}



var data = {
    value:'029uenaod',
    count: 0,
    audit:{},
    order:[
      'localhost',
      '52.27.64.194',
      '52.27.64.194',
      'localhost',
      '52.27.64.194',
    ]
  };
senda(data);

console.log('argv: '+process.argv[2]);




/* Passes object on to next node
  If next node does not respond, that node is skipped 
  return: 
    true  - if this managed to send
    false - implies all nodes are skipped */

var passObject = function (data) {
  var request = require('request');
  
  if (data.order.length <= 0) {
    console.log('(finished) use GET to retrieve data');
    return;
  }
  
  var lock = true;
  console.log('(sending)');
  while (data.order.length > 0) {
    /* get destination from data.order[] */
    var dest = data.order.shift();
    var url = "http://"+dest+"/api";  // var dest = "52.27.64.194";

    console.log('(sending) attempt   to '+dest);
        
    request.post(
      url, 
      {json: data},  
      function(err, res, body) { // resp is from POST
        if (!err && res.statusCode == 200) {
          console.log('(sending) successful');
        }
        else {console.log('(err) '+err);}
      });
  } 
}
