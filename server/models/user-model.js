var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost/wipit');
var daySchema = new Schema({
  day: String,
  meal: String
});
var savedSchema = new Schema({
  imageURL: String,
  title: String,
  sourceURL: String,
  recipeID: String,
  ingredients: [String]
});
mongoose.model(
  'User',
  new Schema({
    "email":String,
    "list": { any: [String]},
    "schedule": [daySchema],
    "saved": [savedSchema]
  },
  {
    collection: 'users'
  }
));

module.exports = mongoose.model('User');
