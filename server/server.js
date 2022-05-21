/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains Server to start service.
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import mongooseClient from './config/mongoose';
import routes from './routes';
import Environment from './config/environment';
import cookieParser from 'cookie-parser';

const app = express();

app.use((req, res, next) => {
  bodyParser.json()(req, res, next);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// Start mongo client using mongoose
mongooseClient();

// Point static path to server running directory i.e dist
app.use(express.static(__dirname));

// Set the REST routes
routes(app);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port
server.listen(Environment.PORT, () =>
  console.log(`Server running on localhost: ${Environment.PORT}`));