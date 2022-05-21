'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _products = require('./api/products');

var _products2 = _interopRequireDefault(_products);

var _orders = require('./api/orders');

var _orders2 = _interopRequireDefault(_orders);

var _constants = require('./utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Routes function to load apis on specific routes
exports.default = function (app) {

  app.use('/v1/agnos-products', _products2.default);
  app.use('/v1/agnos-orders', _orders2.default);

  app.get('*', function (req, res) {
    return res.status(_constants.HttpStatus.NOT_FOUND).send('Page not found');
  });
}; /*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes and its configuration
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/