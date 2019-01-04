// server.js

// set up ======================================================================
// get all the tools we need
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import flash from "connect-flash";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import compression from "compression";
import path from "path";
import expressLayouts from 'express-ejs-layouts';
import cors from "cors";
import configDB from "./config/database.js";
import passportConfig from "./config/passport";

const app = express();
const port = process.env.PORT || 8083;


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
passportConfig(passport); // pass passport for configuration

const rejectFolders = ['css', 'bower_components', 'js', 'img', 'fonts', 'images'];

// removing static resources from the logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
    skip: req => rejectFolders.indexOf(req.url.split('/')[1]) !== -1
}));

app.use(compression({threshold: 0}));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors())

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.set('layout', 'layouts/main');

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
import routes from "./app/routes";
import authRoutes from "./app/authRoutes";

routes(app, passport); // load our routes and pass in our app and fully configured passport
authRoutes(app); // load our routes and pass in our app and fully configured passport


app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// launch ======================================================================
app.listen(port, () => console.log(`App listening on port ${port}`));
