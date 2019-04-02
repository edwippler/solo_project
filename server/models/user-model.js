const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connectionString = require('../modules/database-config');

mongoose.connect(connectionString);

mongoose.connection.on('connected', function(){
  console.log(`mongoose connected to: ${connectionString}`);
});

mongoose.connection.on('error', function(err){
  console.log(`mongoose failed ot connect because error: ${err}`);
});
let daySchema = new Schema({
  day: String,
  meal: String
});
let savedSchema = new Schema({
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
    "name":String,
    "list": { any: [String]},
    "schedule": [daySchema],
    "saved": [savedSchema]
  },
  {
    collection: 'users'
  }
));

module.exports = mongoose.model('User');
