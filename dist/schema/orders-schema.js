'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Orders = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
    enum: [_constants.Constants.paymentTypes.CASH, _constants.Constants.paymentTypes.CARD, _constants.Constants.paymentTypes.UPI],
    default: _constants.Constants.paymentTypes.CASH
  },
  "orderStatus": {
    type: String,
    enum: [_constants.Constants.orderStatus.RECIEVED, _constants.Constants.orderStatus.READY],
    default: _constants.Constants.orderStatus.RECIEVED
  },
  "estimatedTime": { type: Number, default: 10 },
  "billGenerated": {
    "itemTotal": { type: Number, default: 0.0, required: true },
    "discount": { type: Number, default: 0.0, required: true },
    "tax": { type: Number, default: 0.0, required: true },
    "totalAmount": { type: Number, default: 0.0, required: true }
  },
  "createdAt": { type: Date, default: Date.now },
  "updatedAt": { type: Date, default: Date.now }
});

OrdersSchema.statics = {
  /**
   * Create order
   * @param {Object} order 
   * @returns order
   */
  createOrder: function createOrder(order) {
    return new _promise2.default(function (resolve, reject) {
      order.save(function (err, document) {
        if (err) {
          console.error('createOrder: Error occurred in creating\n            order', err);
          reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
        }
        return resolve(document);
      });
    });
  },


  /**
   * Find record of order status ready and created 12 min before and update status
   */
  findAndUpdate: function findAndUpdate() {
    var _this = this;

    return new _promise2.default(function (resolve, reject) {
      _this.updateMany({
        orderStatus: _constants.Constants.orderStatus.RECIEVED,
        createdAt: { $gt: new Date(new Date() - 12 * 60000) }
      }, { $set: { orderStatus: _constants.Constants.orderStatus.READY, updatedAt: new Date() } }, { multi: true }, function (err, productData) {
        if (err) {
          console.error('findAndUpdate: Error occured in order collection', err);
          reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
        } else {
          resolve(productData);
        }
      });
    });
  },


  /**
  * Find record of order status ready 5 min back
  */
  findReadyOrders: function findReadyOrders() {
    var _this2 = this;

    return new _promise2.default(function (resolve, reject) {
      _this2.find({
        orderStatus: _constants.Constants.orderStatus.READY,
        updatedAt: { $gt: new Date(new Date() - 5 * 60 * 1000) }
      }, function (err, orderDetail) {
        if (err) {
          console.error('findReadyOrders: Error occured in order collection', err);
          reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
        } else {
          resolve(orderDetail);
        }
      });
    });
  },


  /**
  * Finds the document based on ORDER id
  * @param  {String} taxid - tax id
  * @returns {Object} tax- return tax
  */
  findByOrderId: function findByOrderId(_id) {
    var _this3 = this;

    return new _promise2.default(function (resolve, reject) {
      _this3.findOne({ _id: _id }, function (err, productData) {
        if (err) {
          console.error('findByOrderId: Error occured in order collection', err);
          reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
        } else {
          resolve(productData);
        }
      });
    });
  }
};

var Orders = exports.Orders = _mongoose2.default.model('Orders', OrdersSchema, 'Orders');