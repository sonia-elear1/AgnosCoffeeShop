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

// create new order
ordersRouter.post('/', _ordersController.createOrder);

// get order by order id
ordersRouter.get('/:id', _ordersController.getOrder);

// update order status and send message to respective numbers
ordersRouter.put('/', _ordersController.updateOrderStatus);

module.exports = ordersRouter;