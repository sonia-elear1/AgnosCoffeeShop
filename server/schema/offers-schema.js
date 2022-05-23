/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains coffee shop product schema
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import mongoose from 'mongoose';
import { CustomErrorCode } from '../utils/custom-api-errors'
import { Constants } from '../utils/constants';

let Schema = mongoose.Schema;

let OffersSchema = new Schema({
    "productId": { type: String, minLength: 4, maxLength: 10 },
    "offerProductId": { type: String, minLength: 4, maxLength: 10 },
    "value": { type: Number, default: 0.0 },
    "type": { type: String, enum: [Constants.discountType.FREE, Constants.discountType.FIXED, Constants.discountType.PERCENT], default: Constants.discountType.FIXED },
    "createdAt": { type: Date, default: Date.now }
})

OffersSchema.statics = {

    /**
    * Finds the offer based on product id
    * @param  {String} taxid - tax id
    * @returns {Object} tax- return tax
    */
    findByProductId(productId) {
        return new Promise((resolve, reject) => {
            this.findOne({ productId }, (err, offerProduct) => {
                if (err) {
                    console.error('findByProductId: Error occured in product collection', err);
                    reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
                } else {
                    resolve(offerProduct);
                }
            });
        });
    }
}

export const Offers = mongoose.model('Offers', OffersSchema, 'offers');