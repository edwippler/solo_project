var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var recipeRoute = require('./routes/recipe.routes.js');
var userRoute = require ('./routes/user.routes.js');
var mongoConnection = require('./modules/mongo-connection');

//middleware
app.use(bodyParser.json());

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '.public/index.html'));
})

app.use('/search', recipeRoute);
app.use('/user', userRoute);

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
