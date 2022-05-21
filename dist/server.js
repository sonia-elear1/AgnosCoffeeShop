'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mongoose = require('./config/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _environment = require('./config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); /*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains Server to start service.
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

app.use(function (req, res, next) {
  _bodyParser2.default.json()(req, res, next);
});
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cookieParser2.default)());

// Start mongo client using mongoose
(0, _mongoose2.default)();

// Point static path to server running directory i.e dist
app.use(_express2.default.static(__dirname));

// Set the REST routes
(0, _routes2.default)(app);

// Create HTTP server.
var server = _http2.default.createServer(app);

// Listen on provided port
server.listen(_environment2.default.PORT, function () {
  return console.log('Server running on localhost: ' + _environment2.default.PORT);
});