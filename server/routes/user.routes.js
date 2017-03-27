var router = require('express').Router();
var User = require('../models/user-model');

//retrieving user information
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


//update the schedule array of objects
router.put('/meals', function(req, res){
  var newMeal = req.body;
  var dayIndex = {};
  dayIndex['schedule.'+newMeal.index+'.meal'] = newMeal.meal
  console.log('hit the update meal route');

  // NOTE: test query run on RoboMongo
  // db.getCollection('users').update({_id: ObjectId("58d3dd11d58df7af8836868e")}, {$set: {'schedule.5.meal': 'Fried Chicken'}})

  User.findByIdAndUpdate(
    newMeal.id,
    {
      $set: dayIndex
    },
  function(err, result){
    if (err) {
      console.log('error:', err);
      res.sendStatus(418)
    }else {
      // console.log('RESULT:', result);
      res.sendStatus(202);
    }
  }
);
});

//update the schedule array of objects
router.put('/reset', function(req, res){
  console.log('hit reset route');
var userID = req.body;
var noSchedule = 7; //limits the number of days to 7
var dayIndex = {};

//loop through all days and reset the value to an empty string
for (var i = 0; i < noSchedule ; i++) {
dayIndex['schedule.'+ i +'.meal'] = '';

  User.findByIdAndUpdate(
    userID.id,
    {
      $set: dayIndex
    },
  function(err, result){
    if (err) {
      console.log('error:', err);
      res.sendStatus(418)
    }else {
      // console.log('RESULT:', result);
    }
  }
);
}
res.sendStatus(200)
});


//add item to grocery list
router.put('/grocery', function(req, res) {
  console.log('hit groceryList put route');
  console.log('here is the body ->', req.body);

  var groceryObject = req.body;
  console.log(groceryObject);
  User.findByIdAndUpdate(
    groceryObject.id,
    {
      $push: {list: groceryObject.name}
    },
  function(err, result){
    if (err) {
      console.log('error:', err);
      res.sendStatus(418)
    }else {
      // console.log('RESULT:', result);
      res.sendStatus(202);
    }
  }
);
});

module.exports = router;
