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
});

router.put('/meals', function(req, res){
  var newMeal = req.body;
  console.log('hit the update meal route');
  console.log(newMeal);
  // db.getCollection('users').update({_id: ObjectId("58d3dd11d58df7af8836868e")}, {$set: {'schedule.5.meal': 'Fried Chicken'}})

  // User.findByIdAndUpdate(
  //   {_id: userID},
  //   {
  //     $set:
  //   }
  // )
});
module.exports = router;
