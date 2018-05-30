// server.js

// set up ======================================================================
// get all the tools we need
const express = require('express');
const app = express();
const port = process.env.PORT || 8083;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const compression = require('compression');
const path = require('path');

const configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

const rejectFolders = ['css', 'bower_components', 'js', 'img', 'fonts', 'images'];

// removing static resources from the logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
    skip: (req, res) => rejectFolders.indexOf(req.url.split('/')[1]) !== -1
}));

app.use(compression({threshold: 0}));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({
    secret: 'ilovees6andsotch', // session secret
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// launch ======================================================================
app.listen(port, () => console.log('App listening on port ' + port));
