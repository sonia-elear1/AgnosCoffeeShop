/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains tax schema of products
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import mongoose from 'mongoose';
import { CustomApiError, HttpStatus } from '../utils/custom-api-errors'
import Constants from '../utils/constants';

let Schema = mongoose.Schema;

let TaxSchema = new Schema({
    "taxId": { type: String, minLength: 4, maxLength: 10, required: true },
    "taxType": {
        type: String,
        enum: [Constants.category.BURGER, Constants.category.SANDWICH, Constants.category.BEVERAGE],
        required: true
    },
    "taxPercent": { type: mongoose.Types.Decimal128, default: 0.0 },
}, { _id : false })

TaxSchema.static = {

};

export const Tax = mongoose.model('Tax', TaxSchema, 'Tax');