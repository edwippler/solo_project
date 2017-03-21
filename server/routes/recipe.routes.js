var router = require('express').Router();
var request = require('request');


var key = process.env.FOOD_2_FORK_KEY;
var baseURL = "http://food2fork.com/api/";


// function(searchCriteria) {
// var query = baseURL + "search";
// query += "?key";
// query += "&q=" + searchCriteria;
// console.log(query);
// }

router.get('/', function(req, res) {
  console.log('hit my get recipe route');
  request('http://food2fork.com/api/search?key=e61e1ec0e0c2e647b2b4187615b31558&q=cheese', function (err, response, body) {
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
