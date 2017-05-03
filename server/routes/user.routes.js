var router = require('express').Router();
var User = require('../models/user-model');

//retrieving user information from database
router.get('/', function(req, res){
  var userEmail = req.decodedToken.email;
  console.log('hit my get user route');
  User.findOne({email: userEmail}, function(err, result){
    if (err) {
      console.log('query error:', err);
      res.sendStatus(500);
    }else {
      // console.log('user:', result);
      if (result == null) {
        console.log('No user with requested email:', userEmail);
        res.sendStatus(403);
      }else {
        res.send(result);
      }
    }
  })
});

// // NOTE: Beginning of shcedule section // //
//update the schedule array of objects
router.put('/meals', function(req, res){
  var userEmail = req.decodedToken.email;
  var newMeal = req.body;
  var dayIndex = {};
  dayIndex['schedule.'+newMeal.index+'.meal'] = newMeal.meal
  console.log('hit the update meal route');

  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      console.log('Error completing query:', err);
      res.sendStatus(500);
    }else {
      // console.log(user);
      if (user == null) {
        console.log('No user found with that email:', userEmail);
        res.sendStatus(403);
      }else {
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
          });
        }
      }
    });
  });

//update the schedule array of objects
router.put('/resetMeals', function(req, res){
  console.log('hit reset route');
  var userEmail = req.decodedToken.email;
  var userID = req.body;
  var noSchedule = 7; //limits the number of days to 7
  var dayIndex = {};
  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      console.log('Error completing query:', err);
      res.sendStatus(500);
    }else {
      // console.log(user);
      if (user == null) {
        console.log('No user found with that email:', userEmail);
        res.sendStatus(403);
      }else {

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
              }
            });
          }
          res.sendStatus(200)
        }
      }
    });
  });//end of schedule section

  // // NOTE: beginning of grocery section // //
  //add item to grocery list
  router.put('/grocery', function(req, res) {
    var userEmail = req.decodedToken.email;
    console.log('hit groceryList put route');
    // console.log('here is the body ->', req.body);
    var groceryObject = req.body;
    console.log(groceryObject);

    User.findOne({ email: userEmail }, function (err, user) {
      if (err) {
        console.log('Error completing query:', err);
        res.sendStatus(500);
      }else {
        // console.log(user);
        if (user == null) {
          console.log('No user found with that email:', userEmail);
          res.sendStatus(403);
        }else {
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
                res.sendStatus(202);
              }
            });
          }
        }
      });
    });

  //remove grocery list item
  router.put('/removeGrocery', function(req, res) {
    var userEmail = req.decodedToken.email;
    console.log('hit grocery List remove route');
    var removeObject = req.body;
    // console.log(removeObject);
    User.findOne({ email: userEmail }, function (err, user) {
      if (err) {
        console.log('Error completing query:', err);
        res.sendStatus(500);
      }else {
        // console.log(user);
        if (user == null) {
          console.log('No user found with that email:', userEmail);
          res.sendStatus(403);
        }else {
          User.findByIdAndUpdate(
            removeObject.id,
            {
            $pull: {list: removeObject.itemToRemove}
            },
            function(err, result){
              if (err) {
                console.log('error:', err);
                res.sendStatus(418)
              }else {
                res.sendStatus(202);
              }
            });
          }
        }
      });
    });

    //clear grocery list
    router.put('/emptyList', function(req, res) {
      var userEmail = req.decodedToken.email;
      console.log('hit clear groceryList route');
      User.findOne({ email: userEmail }, function (err, user) {
        if (err) {
          console.log('Error completing query:', err);
          res.sendStatus(500);
        }else {
          // console.log(user);
          if (user == null) {
            console.log('No user found with that email:', userEmail);
            res.sendStatus(403);
          }else {
            var userObject = req.body;
            User.findByIdAndUpdate(
              userObject.id,
              {
                $set: {list: []}
              },
              function(err, result){
                if (err) {
                  console.log('error:', err);
                  res.sendStatus(418)
                }else {
                  res.sendStatus(202);
                }
              });
            }
          }
        });
      });//end of grocery section


    // // NOTE: beginning of saved recipe section // //
    //add item to saved recipes
    router.put('/saved', function(req, res) {
      var userEmail = req.decodedToken.email;
      console.log('hit save recipe put route');
      var recipeObject = req.body;
      User.findOne({ email: userEmail }, function (err, user) {
        if (err) {
          console.log('Error completing query:', err);
          res.sendStatus(500);
        }else {
          // console.log(user);
          if (user == null) {
            console.log('No user found with that email:', userEmail);
            res.sendStatus(403);
          }else {
            // console.log(recipeObject);
            User.findByIdAndUpdate(
              recipeObject.userID,
              {
                $push: {saved: {
                  imageURL: recipeObject.imageURL,
                  title: recipeObject.title,
                  sourceURL: recipeObject.sourceURL,
                  recipeID: recipeObject.recipeID,
                  ingredients: recipeObject.ingredients}}
                },
                function(err, result){
                  if (err) {
                    console.log('error:', err);
                    res.sendStatus(418)
                  }else {
                    res.sendStatus(202);
                  }
                });
              }
            }
          });
        });

    // NOTE: beginning of saved recipe section //
    //add item to saved recipes
    router.put('/unsave', function(req, res) {
      var userEmail = req.decodedToken.email;
      console.log('hit delete recipe route');
      var recipeObject = req.body;
      // console.log(recipeObject);
      User.findOne({ email: userEmail }, function (err, user) {
        if (err) {
          console.log('Error completing query:', err);
          res.sendStatus(500);
        }else {
          // console.log(user);
          if (user == null) {
           console.log('No user found with that email:', userEmail);
           res.sendStatus(403);
          }else {
            User.findByIdAndUpdate(
            recipeObject.userID,
            {
              $pull: {saved: {recipeID: recipeObject.recipeID}}
            },
              function(err, result){
                if (err) {
                  console.log('error:', err);
                  res.sendStatus(418)
                }else {
                  res.sendStatus(202);
                }
               });
              }
            }
          });
        });

router.put('/register', function(req, res){
  var newUser = req.body;
  console.log(newUser);
  res,sendStatus(200);
});

module.exports = router;
