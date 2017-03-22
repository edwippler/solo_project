var router = require('express').Router();
var request = require('request-promise');
var dotenv = require('dotenv').config();


var baseURL = "http://food2fork.com/api/";
var key = process.env.FOOD_2_FORK_KEY;

router.get('/', function(req, res) {
  var criteria = req.query;
  console.log(criteria);
  var options = {
    uri:'http://food2fork.com/api/search',
    qs:{
      key: key,
      q: criteria.q
    },
    headers:{
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  console.log(options);
  console.log('hit my get recipe route');
  request(options, function (err, response, body) {
    if (err) {
      console.log('error:', error); // Print the error if one occurred
    }else{
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.
      res.send(body);
    }
  });

});


module.exports = router;
