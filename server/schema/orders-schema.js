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
        enum: [Constants.paymentType.CASH, Constants.paymentType.CARD, Constants.paymentType.UPI],
        default: Constants.paymentType.CASH
    },
    "orderStatus": {
        type: String,
        enum: [Constants.orderStatus.RECIEVED, Constants.orderStatus.PROGRESS, Constants.orderStatus.READY, Constants.orderStatus.COMPLETED],
        default: Constants.orderStatus.RECIEVED
    },
    "estimatedTime": { type: Number, default: 10 },
    "billGenerated": {
        "itemTotal": { type: Number, default: 0.0 },
        "discount": { type: Number, default: 0.0 },
        "tax": { type: Number, default: 0.0 },
        "totalAmount": { type: Number, default: 0.0 }
    },
    "createdAt": { type: Date, default: Date.now },
    "updatedAt": { type: Date, default: Date.now },
})


OrdersSchema.static = {

};

export const Orders = mongoose.model('Orders', OrdersSchema, 'Orders');