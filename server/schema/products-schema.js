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
  "cost": { type: Number, default: 0.0 },
  "taxId": { type: String, ref: 'Tax' },
  "preperationTime": { type: Number, default: 10, maximum: 30 },
  "createdAt": { type: Date, default: Date.now }
})

// create index on collection to have unique productId
ProductsSchema.index({ "productId": 1 }, { unique: true });

ProductsSchema.statics = {

  /**
  * Finds the document based on product id
  * @param  {String} taxid - tax id
  * @returns {Object} tax- return tax
  */
  findByProductId(productId) {
    return new Promise((resolve, reject) => {
      this.findOne({ productId }, (err, productData) => {
        if (err) {
          console.error('findByProductId: Error occured in product collection', err);
          reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
        } else {
          resolve(productData);
        }
      });
    });
  },

  /**
   * Create product
   * @param {Object} product 
   * @returns product
   */
  createProduct(product) {
    return new Promise((resolve, reject) => {
      product.save((err, document) => {
        if (err) {
          console.error(`createProduct: Error occurred in creating
            product`, err);
          reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
        }
        return resolve(document);
      });
    });
  },

  /**
 * Finds the document based on product id
 * @param  {String} taxid - tax id
 * @returns {Object} tax- return tax
 */
  findAll() {
    return new Promise((resolve, reject) => {
      this.find({}, (err, productData) => {
        if (err) {
          console.error('findByProductId: Error occured in product collection', err);
          reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
        } else {
          resolve(productData);
        }
      });
    });
  },
}

export const Products = mongoose.model('Products', ProductsSchema, 'products');