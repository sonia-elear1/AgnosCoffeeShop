'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Taxes = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = require('../utils/constants');

var _customApiErrors = require('../utils/custom-api-errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; /*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains tax schema of products
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var TaxSchema = new Schema({
  "taxId": { type: String, minLength: 1, maxLength: 10, required: true },
  "taxType": {
    type: String,
    enum: [_constants.Constants.category.BEVERAGE, _constants.Constants.category.BURGER, _constants.Constants.category.SANDWICH],
    required: true
  },
  "taxPercent": { type: Number, default: 0.0 }
});

TaxSchema.statics = {

  /**
  * Finds the document based on tax id
  * @param  {String} taxid - tax id
  * @returns {Object} tax- return tax
  */
  findByTaxId: function findByTaxId(taxId) {
    var _this = this;

    return new _promise2.default(function (resolve, reject) {
      _this.findOne({ taxId: taxId }, function (err, taxData) {
        if (err) {
          console.error('findByTaxId: Error occured in tax collection', err);
          reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
        } else {
          resolve(taxData);
        }
      });
    });
  }
};

var Taxes = exports.Taxes = _mongoose2.default.model('Taxes', TaxSchema, 'tax');