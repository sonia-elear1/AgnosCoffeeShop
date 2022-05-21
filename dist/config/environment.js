"use strict";

/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains ENVIRONMENT SETUP
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var Environment = {
  // Port on which the server will be listening to
  "PORT": process.env.PORT || 8080,

  // Mongodb configurations
  // Mongo db url
  "MONGO_DB_URL": "mongodb://localhost:27017",
  // Name of database used by the service
  "DB_NAME": "AgnosCoffeeShop",
  // user mongo authentication username
  "MONGO_DB_USERNAME": "user",
  // user mongo authentication password
  "MONGO_DB_PASSWORD": "password"
};

module.exports = Environment;