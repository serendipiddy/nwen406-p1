var send = function (data) {
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
  
  if (data.order.length <= 0) {
    console.log('(finished) use GET to retrieve data');
    return;
  }
  
  var lock = true;
  
  while (data.order.length > 0 );
  {
    /* get destination from data.order[] */
    var dest = data.order.shift();
    var url = "http://"+dest+"/test";  // var dest = "52.27.64.194";

    console.log('(sending) attempt to '+url);
        
    request.post(
      url, 
      {json: data},  
      function(err, res, body) { // resp is from POST
        if (!err && res.statusCode == 200) {
          console.log('(sending) successful');
        }
        else {console.log('err:'+err);}
      });
  } 
}

var data = {
    value:'the test value',
    count: 0,
    audit:{},
    order:[
      '52.27.64.12',
      '52.27.64.194',
      '52.27.64.194'
    ]
  };
send(data);
