"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkTaxIdExist = exports.validProductId = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _productsSchema = require("../../schema/products-schema");

var _taxSchema = require("../../schema/tax-schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check product id is valid
 * @param {String} productId 
 * @returns Boolean : valid / not valid
 */
/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Services used for products apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var validProductId = exports.validProductId = function validProductId(productId) {
    return _productsSchema.Products.findByProductId(productId).then(function (response) {
        if (!response) {
            return false;
        }
        return response;
    }).catch(function (error) {
        return _promise2.default.reject(error);
    });
};

/**
 * Check if tax id exist in record
 * @param {String} taxId 
 * @returns Boolean: true/false
 */
var checkTaxIdExist = exports.checkTaxIdExist = function checkTaxIdExist(taxId) {

    return _taxSchema.Taxes.findByTaxId(taxId).then(function (response) {
        if (!response) {
            return false;
        }
        return true;
    }).catch(function (err) {
        _promise2.default.reject(err);
    });
};