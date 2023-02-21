'use strict';
/**
 ** Import Module dependencies
 */
const
    express = require('express'),
    bParser = require('body-parser'),
    Routes = require('./Routes');

/**
 * Create Express App
 */
const App = express();

/**
 * Config Middleware Stack
 */
App.use(bParser.json());
App.use(bParser.urlencoded({ extended: true }));

/**
 * Setup Test Route
 */
App.get('/test', function (req, res) {
    return res.status(200).
      send('<marquee><h1>Yaaaay... it works!!!</h1></marquee>');
  });

/**
 * Import Routes
 */
App.use('/', Routes);

/**
 * Export App
 */
module.exports = App;