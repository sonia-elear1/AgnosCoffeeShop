'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Orders = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _customApiErrors = require('../utils/custom-api-errors');

var _constants = require('../utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; /*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains coffee shop order schema
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var OrdersSchema = new Schema({
    "userId": { type: _mongoose2.default.Types.ObjectId, required: true },
    "productIds": [{ type: String, minimum: 1 }],
    "paymentType": {
        type: String,
        enum: [_constants.Constants.paymentType.CASH, _constants.Constants.paymentType.CARD, _constants.Constants.paymentType.UPI],
        default: _constants.Constants.paymentType.CASH
    },
    "orderStatus": {
        type: String,
        enum: [_constants.Constants.orderStatus.RECIEVED, _constants.Constants.orderStatus.PROGRESS, _constants.Constants.orderStatus.READY, _constants.Constants.orderStatus.COMPLETED],
        default: _constants.Constants.orderStatus.RECIEVED
    },
    "estimatedTime": { type: Number, default: 10 },
    "billGenerated": {
        "itemTotal": { type: Number, default: 0.0 },
        "discount": { type: Number, default: 0.0 },
        "tax": { type: Number, default: 0.0 },
        "totalAmount": { type: Number, default: 0.0 }
    },
    "createdAt": { type: Date, default: Date.now },
    "updatedAt": { type: Date, default: Date.now }
});

OrdersSchema.static = {};

var Orders = exports.Orders = _mongoose2.default.model('Orders', OrdersSchema, 'Orders');