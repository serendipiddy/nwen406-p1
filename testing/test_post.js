var senda = function (data) {
  var request = require('request');
  
  var url = "http://52.27.64.194/api"; // pop from order
  // var url = "http://sarah.olly.kiwi/api"; // pop from order

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

var data = {
    value:'theBeginning',
    count: 0,
    audit:{},
    order:[
      'max.olly.kiwi',
      'jordan.olly.kiwi',
      // 'olly.olly.kiwi',
      // 'alex.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'olly.olly.kiwi',
      // 'alex.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'olly.olly.kiwi',
      // 'alex.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'olly.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'olly.olly.kiwi',
      // 'alex.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'olly.olly.kiwi',
      // 'alex.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'max.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'max.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'jordan.olly.kiwi',
      // 'olly.olly.kiwi',
      // 'sarah.olly.kiwi',
      // 'callum.olly.kiwi',
    ]
  };
senda(data);