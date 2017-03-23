var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/wipit');

mongoose.model(
  'User',
  new Schema({
    "email":String,
    "list": { any: [String]},
    "schedule": { any: [String]},
    "saved": {any: []}
  },
  {
    collection: 'users'
  }
));

module.exports = mongoose.model('User');
