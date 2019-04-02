const router = require('express').Router();
const request = require('request-promise');
const dotenv = require('dotenv').config();


// var baseURL = "http://food2fork.com/api/";
const key = process.env.FOOD_2_FORK_KEY;

//base
router.get('/', function(req, res) {
  let criteria = req.query;
  // console.log(criteria);
  let options = {
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
  // console.log(options);
  // console.log('hit my get recipe route');
  request(options, function (err, response, body) {
    if (err) {
      console.log('error:', error); // Print the error if one occurred
    }else{
      console.log('statusCode:', response && response.statusCode);
      res.send(body);
    }
  });
});//end of search route

router.get('/details/:id', function(req, res) {
  let recipeID = req.params.id;
  console.log(recipeID);
  let options = {
    uri:'http://food2fork.com/api/get',
    qs:{
      key: key,
      rId: recipeID
    },
    headers:{
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  console.log(options);
  console.log('hit my get details route');
  request(options, function (err, response, body) {
    if (err) {
      console.log('error:', error); // Print the error if one occurred
    }else{
      console.log('statusCode:', response && response.statusCode);
      console.log(body);
      res.send(body);
    }
  });
});//end of details route


module.exports = router;
