"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _environment = require("./environment");

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains mongoose configuration
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

exports.default = function () {
  // mongoose connection options
  var options = {
    // user name and password for mongo authentication
    auth: {
      user: _environment2.default.MONGO_DB_USERNAME,
      password: _environment2.default.MONGO_DB_PASSWORD
    },
    dbName: _environment2.default.DB_NAME
  };

  // The underlying MongoDB driver will automatically try
  // to reconnect when it loses connection to MongoDB
  // when we enable unifiedTopology option
  _mongoose2.default.set('useUnifiedTopology', true);

  // The MongoDB Node.js driver rewrote the tool it uses to
  // parse MongoDB connection strings. They have put the new
  // connection string parser behind a flag. To turn on this
  // option, pass the useNewUrlParser
  _mongoose2.default.set('useNewUrlParser', true);

  // Mongoose's findOneAndUpdate() long pre-dates the MongoDB
  // driver's findOneAndUpdate() function, so it uses the
  // MongoDB driver's findAndModify() function instead
  _mongoose2.default.set('useFindAndModify', false);

  // By default, Mongoose 5.x calls the MongoDB driver's
  // ensureIndex() function. The MongoDB driver deprecated this
  // function in favor of createIndex()
  _mongoose2.default.set('useCreateIndex', true);

  // Emitted when Mongoose starts making its initial
  // connection to the MongoDB server
  _mongoose2.default.connection.on('connecting', function () {
    console.log('connecting to MongoDB...');
  });

  // Emitted when Mongoose successfully makes its
  // initial connection to the MongoDB server
  _mongoose2.default.connection.on('connected', function () {
    console.log('MongoDB connected!');
  });

  // Emitted when Mongoose lost connection to the MongoDB
  // server. This event may be due to your code explicitly
  // closing the connection, the database server crashing,
  // or network connectivity issues
  _mongoose2.default.connection.on('disconnected', function () {
    console.log('MongoDB disconnected!');
  });

  // Emitted if Mongoose lost connectivity to MongoDB and
  // successfully reconnected. Mongoose attempts to
  // automatically reconnect when it loses connection to
  // the database
  _mongoose2.default.connection.on('reconnected', function () {
    console.log('MongoDB reconnected!');
  });

  // Emitted if an error occurs on a connection, like a
  // parseError due to malformed data or a payload larger
  // than 16MB
  _mongoose2.default.connection.on('error', function (err) {
    console.log('Error occurred in MongoDB' + err);
  });

  // Connecting MongoDB through mongoose
  _mongoose2.default.connect(_environment2.default.MONGO_DB_URL, options, function (error) {
    if (error) {
      console.log("Server failed to connect db with error = " + error);
      process.exit(1);
    } else {
      console.log('Server connected successfully to the db');
    }
  });
};