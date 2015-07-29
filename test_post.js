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

send('hello');
