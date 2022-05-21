'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Orders = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _customApiErrors = require('../utils/custom-api-errors');

var _constants = require('../utils/constants');

var _constants2 = _interopRequireDefault(_constants);

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
        enum: [_constants2.default.paymentType.CASH, _constants2.default.paymentType.CARD, _constants2.default.paymentType.UPI],
        default: _constants2.default.paymentType.CASH
    },
    "orderStatus": {
        type: String,
        enum: [_constants2.default.orderStatus.RECIEVED, _constants2.default.orderStatus.PROGRESS, _constants2.default.orderStatus.READY, _constants2.default.orderStatus.COMPLETED],
        default: _constants2.default.paymentType.RECIEVED
    },
    "estimatedTime": { type: Number, default: 10 },
    "billGenerated": {
        "itemTotal": { type: _mongoose2.default.Types.Decimal128, default: 0.0 },
        "discount": { type: _mongoose2.default.Types.Decimal128, default: 0.0 },
        "tax": { type: _mongoose2.default.Types.Decimal128, default: 0.0 },
        "totalAmount": { type: _mongoose2.default.Types.Decimal128, default: 0.0 }
    },
    "createdAt": { type: Date, default: Date.now },
    "updatedAt": { type: Date, default: Date.now }
});

OrdersSchema.static = {};

var Orders = exports.Orders = _mongoose2.default.model('Orders', OrdersSchema, 'Orders');