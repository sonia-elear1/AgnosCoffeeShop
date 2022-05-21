'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _products = require('./api/products');

var _products2 = _interopRequireDefault(_products);

var _orders = require('./api/orders');

var _orders2 = _interopRequireDefault(_orders);

var _tax = require('./api/tax');

var _tax2 = _interopRequireDefault(_tax);

var _users = require('./api/users');

var _users2 = _interopRequireDefault(_users);

var _customApiErrors = require('./utils/custom-api-errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Routes function to load apis on specific routes
exports.default = function (app) {

  app.use('/v1/agnos-product', _products2.default);
  app.use('/v1/agnos-orders', _orders2.default);
  app.use('/v1/agnos-tax', _tax2.default);
  app.use('/v1/agnos-users', _users2.default);

  app.get('*', function (req, res) {
    return res.status(_customApiErrors.HttpStatus.NOT_FOUND).send('Page not found');
  });
}; /*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes and its configuration
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/