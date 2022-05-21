"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkTaxIdExist = exports.validProductId = exports.validOffers = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _productsSchema = require("../../schema/products-schema");

var _taxSchema = require("../../schema/tax-schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check offers passed is valid or not
 * @param {Object[]} offers - offers array
 * @return Boolean: valid offer or not
 */
/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Services used for products apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var validOffers = exports.validOffers = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(offers) {
        var offer, checkValid;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        offer = 0;

                    case 1:
                        if (!(offer < offers.length)) {
                            _context.next = 10;
                            break;
                        }

                        _context.next = 4;
                        return validProductId(offers[offer].productId);

                    case 4:
                        checkValid = _context.sent;

                        if (!(!checkValid || offers[offer].discount && isNaN(offers[offer].discount) || offers[offer].free && typeof free !== 'boolean')) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt("return", false);

                    case 7:
                        offer++;
                        _context.next = 1;
                        break;

                    case 10:
                        return _context.abrupt("return", true);

                    case 11:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function validOffers(_x) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Check product id is valid
 * @param {String} productId 
 * @returns Boolean : valid / not valid
 */
var validProductId = exports.validProductId = function validProductId(productId) {
    return _productsSchema.Products.findByProductId(productId).then(function (response) {
        if (!response) {
            return false;
        }
        return true;
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