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
// console.log(userID);
var schedule = 7;
var dayIndex = {};

for (var i = 0; i < schedule ; i++) {
dayIndex['schedule.'+ i +'.meal'] = '';
  // NOTE: test query run on RoboMongo
  // db.getCollection('users').update({_id: ObjectId("58d3dd11d58df7af8836868e")}, {$set: {'schedule.5.meal': 'Fried Chicken'}})


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


  // // db query
  // User.update(function(err, result){
  //   if(err){
  //     console.log('error adding new task:', err);
  //     res.sendStatus(500);
  //   }else{
  //     res.sendStatus(201);
  //   }
  // })
  res.sendStatus(200);
});

module.exports = router;
