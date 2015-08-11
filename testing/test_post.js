var send = function (data) {
  var request = require('request');
  
  var url = "http://jordan.olly.kiwi/api";

  console.log('SENDING'
      +'\nto:   '+url
      +'\ndata: \n'+JSON.stringify(data, null, 2));
      
  request.post(
    url, 
    {json: data},
    function(err, res, body) {
      if (!err && res.statusCode == 202) {
        console.log('success:\n'+body);
      }
      else {
        console.log('err:'+err);
      }
    });
}

var data = {
    value:'theBeginning',
    count: 0,
    audit:{},
    order:[
      'alex.olly.kiwi',
      'sarah.olly.kiwi',
      'callum.olly.kiwi',
      'max.olly.kiwi',
      'olly.olly.kiwi',
      'jordan.olly.kiwi',
    ]
  };
  
send(data);

      // 'jordan.olly.kiwi',
      // 'olly.olly.kiwi',
      // 'alex.olly.kiwi',
      // 'max.olly.kiwi',