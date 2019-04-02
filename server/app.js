const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoConnection = require('./modules/mongo-connection');
const decoder = require('./modules/decoder');
const recipeRoute = require('./routes/recipe.routes.js');
const userRoute = require ('./routes/user.routes.js');

const portDecision = process.env.PORT || 5000;

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
    console.log(`Listening on port: ${portDecision}`);
});
