/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains mongoose configuration
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import mongoose from "mongoose";
import Environment from "./environment";

export default () => {
  // mongoose connection options
  let options = {
    // user name and password for mongo authentication
    auth: {
      user: Environment.MONGO_DB_USERNAME,
      password: Environment.MONGO_DB_PASSWORD
    },
    dbName: Environment.DB_NAME
  };

  // The underlying MongoDB driver will automatically try
  // to reconnect when it loses connection to MongoDB
  // when we enable unifiedTopology option
  mongoose.set('useUnifiedTopology', true);

  // The MongoDB Node.js driver rewrote the tool it uses to
  // parse MongoDB connection strings. They have put the new
  // connection string parser behind a flag. To turn on this
  // option, pass the useNewUrlParser
  mongoose.set('useNewUrlParser', true);

  // Mongoose's findOneAndUpdate() long pre-dates the MongoDB
  // driver's findOneAndUpdate() function, so it uses the
  // MongoDB driver's findAndModify() function instead
  mongoose.set('useFindAndModify', false);

  // By default, Mongoose 5.x calls the MongoDB driver's
  // ensureIndex() function. The MongoDB driver deprecated this
  // function in favor of createIndex()
  mongoose.set('useCreateIndex', true);

  // Emitted when Mongoose starts making its initial
  // connection to the MongoDB server
  mongoose.connection.on('connecting', function() {
    console.log('connecting to MongoDB...');
  });

  // Emitted when Mongoose successfully makes its
  // initial connection to the MongoDB server
  mongoose.connection.on('connected', function() {
    console.log('MongoDB connected!');
  });

  // Emitted when Mongoose lost connection to the MongoDB
  // server. This event may be due to your code explicitly
  // closing the connection, the database server crashing,
  // or network connectivity issues
  mongoose.connection.on('disconnected', function() {
    console.log('MongoDB disconnected!');
  });

  // Emitted if Mongoose lost connectivity to MongoDB and
  // successfully reconnected. Mongoose attempts to
  // automatically reconnect when it loses connection to
  // the database
  mongoose.connection.on('reconnected', function() {
   console.log('MongoDB reconnected!');
  });

  // Emitted if an error occurs on a connection, like a
  // parseError due to malformed data or a payload larger
  // than 16MB
  mongoose.connection.on('error', function(err) {
    console.log('Error occurred in MongoDB' + err);
  });

  // Connecting MongoDB through mongoose
  mongoose.connect(Environment.MONGO_DB_URL, options, (error) => {
    if (error) {
      console.log(`Server failed to connect db with error = ${error}`);
      process.exit(1);
    } else {
      console.log('Server connected successfully to the db');
    }
  });
};