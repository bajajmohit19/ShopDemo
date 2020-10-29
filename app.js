// server.js

// set up ======================================================================
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import flash from 'connect-flash'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import compression from 'compression'
import path from 'path'
import expressLayouts from 'express-ejs-layouts'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

import configDB from './config/database'
import passportConfig from './config/passport'

// routes ======================================================================
import routes from './app/routes'
import authRoutes from './app/authRoutes'
import countryRoutes from './app/api/country';
import stateRoutes from './app/api/state';
import cityRoutes from './app/api/city';
import universityRoutes from './app/api/university';
import courseRoutes from './app/api/course';
import branchRoutes from './app/api/branch';
import campusRoutes from './app/api/campus';




const app = express()
const swaggerDocument = YAML.load('./swagger.yaml')

// configuration ===============================================================
mongoose.connect(configDB.url) // connect to our database
passportConfig(passport) // pass passport for configuration

const rejectFolders = [
  'css',
  'bower_components',
  'js',
  'img',
  'fonts',
  'images']

// removing static resources from the logger
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms', {
    skip: req => rejectFolders.indexOf(req.url.split('/')[1]) !== -1,
  }))

app.use(compression({threshold: 0}))
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use(cors())

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.set('layout', 'layouts/main')

app.use(express.static(path.join(__dirname, 'public')))

// required for passport
app.use(session({
  secret: process.env.SECRET_KEY || 'asdfsadfkjhsadfkjhasdkjfhasdjkfh k', // session secret
  resave: true,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

routes(app, passport) // load our routes and pass in our app and fully configured passport

countryRoutes(app, passport);
stateRoutes(app, passport);
cityRoutes(app, passport);
universityRoutes(app, passport);
courseRoutes(app, passport);
branchRoutes(app, passport);
campusRoutes(app, passport);


app.use('/', authRoutes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

mongoose.set('debug', true)

module.exports = app
