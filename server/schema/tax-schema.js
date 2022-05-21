/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains tax schema of products
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import mongoose from 'mongoose';
import { Constants } from '../utils/constants';
import { CustomErrorCode } from '../utils/custom-api-errors'

let Schema = mongoose.Schema;

let TaxSchema = new Schema({
  "taxId": { type: String, minLength: 1, maxLength: 10, required: true },
  "taxType": {
    type: String,
    enum: [Constants.category.BEVERAGE, Constants.category.BURGER, Constants.category.SANDWICH],
    required: true
  },
  "taxPercent": { type: Number, default: 0.0 },
})

TaxSchema.statics = {

  /**
  * Finds the document based on tax id
  * @param  {String} taxid - tax id
  * @returns {Object} tax- return tax
  */
  findByTaxId(taxId) {
    return new Promise((resolve, reject) => {
      this.findOne({ taxId }, (err, taxData) => {
        if (err) {
          console.error('findByTaxId: Error occured in tax collection', err);
          reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
        } else {
          resolve(taxData);
        }
      });
    });
  }

};

export const Taxes = mongoose.model('Taxes', TaxSchema, 'tax');