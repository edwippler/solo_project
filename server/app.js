var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoConnection = require('./modules/mongo-connection');
var decoder = require('./modules/decoder');
var recipeRoute = require('./routes/recipe.routes.js');
var userRoute = require ('./routes/user.routes.js');

var portDecision = process.env.PORT || 5000;

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '.public/index.html'));
});

app.use('/search', recipeRoute);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(decoder.token);


app.use('/user', userRoute);

app.listen(portDecision, function() {
    console.log('Listening on port: ', portDecision);
});
