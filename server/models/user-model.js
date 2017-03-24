var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/wipit');
var daySchema = new Schema({
  day: String,
  meal: String
});
mongoose.model(
  'User',
  new Schema({
    "email":String,
    "list": { any: [String]},
    "schedule": [daySchema],
    "saved": {ofMixed:[Schema.Types.Mixed]}
  },
  {
    collection: 'users'
  }
));

module.exports = mongoose.model('User');
