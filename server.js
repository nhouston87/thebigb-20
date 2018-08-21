// Bring in global variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Bring in routes
const user_routes = require('./routes/api/users');
const game_routes = require('./routes/api/game');

// Instatiate main app object
const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Bring in MongoDB URI string and validate connection to DB
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Configure routes
app.use('/api/users', user_routes);
app.use('/api/game', game_routes);

// Set port variable and set app to listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
