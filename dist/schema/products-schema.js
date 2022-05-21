'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Products = undefined;

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
 * @fileOverview Contains coffee shop product schema
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var ProductsSchema = new Schema({
  "name": { type: String, minLength: 5, maxLength: 50, required: true },
  "productId": { type: String, minLength: 4, maxLength: 10, required: true },
  "type": {
    type: String,
    enum: [_constants.Constants.type.VEGETARIAN, _constants.Constants.type.NONVEGETARIAN],
    default: _constants.Constants.type.VEGETARIAN
  },
  "category": {
    type: String,
    enum: [_constants.Constants.category.BURGER, _constants.Constants.category.SANDWICH, _constants.Constants.category.BEVERAGE],
    required: true
  },
  "cost": { type: Number, default: 0.0 },
  "discountPercent": { type: Number, default: 0.0 },
  "taxId": { type: String, ref: 'Tax' },
  "preperationTime": { type: Number, default: 10, maximum: 30 },
  "offers": [{
    "productId": { type: String, minLength: 4, maxLength: 10 },
    "discount": { type: Number, default: 0.0 },
    "free": { type: Boolean, default: false }
  }],
  "createdAt": { type: Date, default: Date.now }
});

// create index on collection to have unique productId
ProductsSchema.index({ "productId": 1 }, { unique: true });

ProductsSchema.statics = {

  /**
  * Finds the document based on product id
  * @param  {String} taxid - tax id
  * @returns {Object} tax- return tax
  */
  findByProductId: function findByProductId(productId) {
    var _this = this;

    return new _promise2.default(function (resolve, reject) {
      _this.findOne({ productId: productId }, function (err, productData) {
        if (err) {
          console.error('findByProductId: Error occured in product collection', err);
          reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
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
  createProduct: function createProduct(product) {
    return new _promise2.default(function (resolve, reject) {
      product.save(function (err, document) {
        if (err) {
          console.error('createProduct: Error occurred in creating\n            product', err);
          reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
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
  findAll: function findAll() {
    var _this2 = this;

    return new _promise2.default(function (resolve, reject) {
      _this2.find({}, function (err, productData) {
        if (err) {
          console.error('findByProductId: Error occured in product collection', err);
          reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
        } else {
          resolve(productData);
        }
      });
    });
  }
};

var Products = exports.Products = _mongoose2.default.model('Products', ProductsSchema, 'products');