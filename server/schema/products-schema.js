/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains coffee shop product schema
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import mongoose from 'mongoose';
import { CustomApiError, HttpStatus } from '../utils/custom-api-errors'
import Constants from '../utils/constants';

let Schema = mongoose.Schema;

let ProductsSchema = new Schema({
    "name": { type: String, minLength: 5, maxLength: 50, required: true },
    "productId": { type: String, minLength: 4, maxLength: 10, required: true },
    "type": {
        type: String,
        enum: [Constants.type.VEGETARIAN, Constants.type.NONVEGETARIAN],
        default: Constants.type.VEGETARIAN
    },
    "category": {
        type: String,
        enum: [Constants.category.BURGER, Constants.category.SANDWICH, Constants.category.BEVERAGE],
        required: true
    },
    "cost": { type: mongoose.Types.Decimal128, default: 0.0 },
    "discount": { type: mongoose.Types.Decimal128, default: 0.0 },
    "taxRate": { type: String, ref: 'Tax' },
    "preperationTime": { type: Number, default: 10 },
    "offers": [{
        "productId": { type: String, minLength: 4, maxLength: 10 },
        "discount": { type: mongoose.Types.Decimal128, default: 0.0 },
        "free": { type: Boolean, default: false }
    }],
    "createdAt": { type: Date, default: Date.now }
})

// create index on collection to have unique productId
ProductsSchema.index({ "productId": 1 }, { unique: true });

ProductsSchema.statics = {}

export const Products = mongoose.model('Products', ProductsSchema, 'Products');