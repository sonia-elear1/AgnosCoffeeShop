"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateBill = exports.getEstimatedTime = exports.validateProductId = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _offersSchema = require("../../schema/offers-schema");

var _taxSchema = require("../../schema/tax-schema");

var _constants = require("../../utils/constants");

var _productsService = require("../products/products-service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validate if product id exist 
 * @param {String[]} productIds 
 * @returns {Object[]} products
 */
/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Services used for products apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var validateProductId = exports.validateProductId = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(productIds) {
        var products, ids, validProduct;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        products = [];
                        ids = 0;

                    case 2:
                        if (!(ids < productIds.length)) {
                            _context.next = 12;
                            break;
                        }

                        _context.next = 5;
                        return (0, _productsService.validProductId)(productIds[ids]);

                    case 5:
                        validProduct = _context.sent;

                        products.push(validProduct);

                        if (validProduct) {
                            _context.next = 9;
                            break;
                        }

                        return _context.abrupt("return", false);

                    case 9:
                        ids++;
                        _context.next = 2;
                        break;

                    case 12:
                        return _context.abrupt("return", products);

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function validateProductId(_x) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Calculated estimated time
 * @param {*} products 
 * @returns {Number} - estimated time
 */
var getEstimatedTime = exports.getEstimatedTime = function getEstimatedTime(products) {
    var estimatedTime = products.map(function (value) {
        return value.preperationTime;
    });
    return Math.max.apply(Math, (0, _toConsumableArray3.default)(estimatedTime));
};

/**
 * calculate order bill
 * @param {*} products 
 * @returns {Object} - bill generated
 */
var calculateBill = exports.calculateBill = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(products) {
        var billGenerated, itemTotal, discount, tax, visited, productIds, freeItemsId, product, pId, offeredProduct, productTax, offeredProductId, idx, offeredProductTax, d1, d2, totalAmount;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        billGenerated = {};
                        itemTotal = 0, discount = 0, tax = 0;
                        visited = [];
                        productIds = [];
                        freeItemsId = [];


                        for (product = 0; product < products.length; product++) {
                            visited[product] = false;
                            productIds.push(products[product].productId);
                        }

                        pId = 0;

                    case 7:
                        if (!(pId < products.length)) {
                            _context2.next = 38;
                            break;
                        }

                        itemTotal += products[pId].cost;
                        //  check for visited, if false then proceed otherwise skip

                        if (!(visited[pId] === false)) {
                            _context2.next = 35;
                            break;
                        }

                        _context2.next = 12;
                        return getOfferProductById(products[pId].productId);

                    case 12:
                        offeredProduct = _context2.sent;
                        _context2.next = 15;
                        return getEstimatedTax(products[pId].taxId);

                    case 15:
                        productTax = _context2.sent;

                        visited[pId] = true;
                        // check for offers applicable for the current product

                        if (!offeredProduct) {
                            _context2.next = 34;
                            break;
                        }

                        offeredProductId = offeredProduct.offerProductId;
                        // if offer exists check for type of offer e.g. free or discount type        

                        if (!(offeredProduct.type === _constants.Constants.discountType.FREE)) {
                            _context2.next = 24;
                            break;
                        }

                        tax += +(productTax / 100 * products[pId].cost).toFixed(2);
                        freeItemsId.push(offeredProductId);
                        _context2.next = 32;
                        break;

                    case 24:
                        idx = productIds.indexOf(offeredProductId);
                        offeredProductTax = void 0;

                        if (!(idx !== -1)) {
                            _context2.next = 32;
                            break;
                        }

                        visited[idx] = true;
                        _context2.next = 30;
                        return getEstimatedTax(products[idx].taxId);

                    case 30:
                        offeredProductTax = _context2.sent;

                        if (offeredProduct.type === _constants.Constants.discountType.FIXED) {
                            discount += offeredProduct.value;
                            tax += +(productTax / 100 * (products[pId].cost - offeredProduct.value)).toFixed(2);
                        } else {
                            d1 = +(offeredProduct.value / 100 * products[pId].cost).toFixed(2);
                            d2 = +(offeredProduct.value / 100 * products[idx].cost).toFixed(2);

                            discount = discount + d1 + d2;
                            tax += +(productTax / 100 * (products[pId].cost - d1)).toFixed(2);
                            tax += +(offeredProductTax / 100 * (products[idx].cost - d2)).toFixed(2);
                        }

                    case 32:
                        _context2.next = 35;
                        break;

                    case 34:
                        tax += +(productTax / 100 * products[pId].cost).toFixed(2);

                    case 35:
                        pId++;
                        _context2.next = 7;
                        break;

                    case 38:
                        totalAmount = itemTotal - discount + tax;

                        billGenerated = {
                            itemTotal: itemTotal,
                            discount: discount,
                            tax: tax,
                            totalAmount: totalAmount
                        };
                        return _context2.abrupt("return", { billGenerated: billGenerated, freeItemsId: freeItemsId });

                    case 41:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function calculateBill(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var getEstimatedTax = function getEstimatedTax(taxId) {
    return _taxSchema.Taxes.findByTaxId(taxId).then(function (response) {
        return response.taxPercent;
    }).catch(function (err) {
        return _promise2.default.reject(err);
    });
};

var getOfferProductById = function getOfferProductById(productId) {
    return _offersSchema.Offers.findByProductId(productId).then(function (response) {
        return response;
    }).catch(function (err) {
        return _promise2.default.reject(err);
    });
};