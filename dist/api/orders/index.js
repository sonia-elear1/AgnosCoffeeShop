'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ordersController = require('./orders-controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes of order apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/
var ordersRouter = _express2.default.Router();

ordersRouter.post('/', _ordersController.createOrder);
ordersRouter.get('/:id', _ordersController.getOrder);
ordersRouter.put('/:id', _ordersController.updateOrderStatus);

module.exports = ordersRouter;