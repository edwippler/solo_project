var mongoose = require('mongoose');
var connectionString = require('./database-config');

// mongoose.set('debug', true);

var connectToMongoDatabase = function(){
  mongoose.connect(connectionString);

  mongoose.connection.on('connected', function(){
    console.log('mongoose connected to ', connectionString);
  });

  mongoose.connection.on('error', function(err){
    console.log('mongoose failed ot connect because error:', err);
  });
}

module.exports = {connect: connectToMongoDatabase};
