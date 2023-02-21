'use strict';
if(process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
/**
 * Module Dependencies
 */
const
    Http = require('http'),
    Mongoose = require('mongoose'),
    App = require('./app');
/**
 * Module variables
 */
const {dBURL} = process.env;

/**
 * Create Server Instance, pass App as the Listener
 */
const Server = Http.createServer(App);

/**
 * Config Mongoose
 */
Mongoose.set('strictQuery', true);

/**
 * Connect to MongoDB Database and initiate Server on connection success
 */
async function main() {    
    try {
      await Mongoose.connect(dBURL);
      console.log('Successfully connected to ' + dBURL);
      return Server.listen(3030, () => console.log('server UP'));

    }
    catch (err) {
      console.error('There was a db connection error');
      console.error(err.message);
      return setTimeout(main, 1000);
    }
}

main();

process.on('SIGINT', function () {
    Mongoose.connection.close(function () {
        console.error('dBase connection closed due to app termination');
        return process.exit(0);
    });
});