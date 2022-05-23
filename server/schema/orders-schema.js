/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains coffee shop order schema
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import mongoose from 'mongoose';
import { CustomErrorCode } from '../utils/custom-api-errors'
import { Constants } from '../utils/constants';

let Schema = mongoose.Schema;

let OrdersSchema = new Schema({
  "userId": { type: mongoose.Types.ObjectId, required: true },
  "productIds": [{ type: String, minimum: 1 }],
  "paymentType": {
    type: String,
    enum: [Constants.paymentTypes.CASH, Constants.paymentTypes.CARD, Constants.paymentTypes.UPI],
    default: Constants.paymentTypes.CASH
  },
  "orderStatus": {
    type: String,
    enum: [Constants.orderStatus.RECIEVED, Constants.orderStatus.READY],
    default: Constants.orderStatus.RECIEVED
  },
  "estimatedTime": { type: Number, default: 10 },
  "billGenerated": {
    "itemTotal": { type: Number, default: 0.0, required: true },
    "discount": { type: Number, default: 0.0, required: true },
    "tax": { type: Number, default: 0.0, required: true },
    "totalAmount": { type: Number, default: 0.0, required: true }
  },
  "createdAt": { type: Date, default: Date.now },
  "updatedAt": { type: Date, default: Date.now },
})


OrdersSchema.statics = {
  /**
   * Create order
   * @param {Object} order 
   * @returns order
   */
  createOrder(order) {
    return new Promise((resolve, reject) => {
      order.save((err, document) => {
        if (err) {
          console.error(`createOrder: Error occurred in creating
            order`, err);
          reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
        }
        return resolve(document);
      });
    });
  },

  /**
   * Find record of order status ready and created 12 min before and update status
   */
  findAndUpdate() {
    return new Promise((resolve, reject) => {
      this.updateMany({
        orderStatus: Constants.orderStatus.RECIEVED,
        createdAt: { $gt: new Date(new Date() - 12 * 60000) }
      }, { $set: { orderStatus: Constants.orderStatus.READY, updatedAt: new Date()} },
         { multi: true }, (err, productData) => {
        if (err) {
          console.error('findAndUpdate: Error occured in order collection', err);
          reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
        } else {
          resolve(productData);
        }
      });
    });
  },

    /**
   * Find record of order status ready 5 min back
   */
    findReadyOrders() {
      return new Promise((resolve, reject) => {
        this.find({
          orderStatus: Constants.orderStatus.READY,
          updatedAt: { $gt: new Date(new Date() - (5 * 60* 1000)) }
        }, (err, orderDetail) => {
          if (err) {
            console.error('findReadyOrders: Error occured in order collection', err);
            reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
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
  findByOrderId(_id) {
    return new Promise((resolve, reject) => {
      this.findOne({ _id }, (err, productData) => {
        if (err) {
          console.error('findByOrderId: Error occured in order collection', err);
          reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
        } else {
          resolve(productData);
        }
      });
    });
  }
};

export const Orders = mongoose.model('Orders', OrdersSchema, 'Orders');