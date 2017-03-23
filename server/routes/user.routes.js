var router = require('express').Router();
var User = require('../models/user-model');

router.get('/', function(req, res){
console.log('hit my get user route');
User.findOne({}, function(err, result){
  if (err) {
    console.log('query error:', err);
    res.sendStatus(500);
  }else {
    res.send(result);
  }
})
})
module.exports = router;
