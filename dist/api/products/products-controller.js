"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getProducts = exports.createProduct = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _productsSchema = require("../../schema/products-schema");

var _constants = require("../../utils/constants");

var _customApiErrors = require("../../utils/custom-api-errors");

var _productsService = require("./products-service");

var _taxSchema = require("../../schema/tax-schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create new Product
 * @param {String} name - req.body.name
 * @param {String} productId - req.body.productId
 * @param {String} type - req.body.type
 * @param {String} category - req.body.category
 * @param {String} cost - req.body.cost
 * @param {String} taxId - req.body.taxId
 * @param {String} preperationTime - req.body.preperationTime
 * @param {String} discountPercent - req.body.discountPercent
 * @param {Object[]} offers - req.body.offers
 * @returns {Object} - created product
 */
var createProduct = exports.createProduct = function createProduct(req, res) {
    var name = req.body.name;
    var productId = req.body.productId;
    var type = req.body.type;
    var category = req.body.category;
    var cost = req.body.cost;
    var taxId = req.body.taxId;
    var preperationTime = req.body.preperationTime;
    var discountPercent = void 0,
        offers = void 0;

    if (req.body.discountPercent) {
        discountPercent = req.body.discountPercent;
    };

    if (req.body.offers) {
        offers = req.body.offers;
    };

    // Check if name is present
    if (name === undefined) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.MISSING_PARAM, fieldName: "name" });
    }

    // Check if productId is present
    if (productId === undefined) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.MISSING_PARAM, fieldName: "productId" });
    }
    // Check if type is present
    if (type === undefined) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.MISSING_PARAM, fieldName: "type" });
    }

    // Check if category is present
    if (category === undefined) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.MISSING_PARAM, fieldName: "category" });
    }

    // Check if cost is present
    if (cost === undefined) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.MISSING_PARAM, fieldName: "cost" });
    }

    // Check if taxId is present
    if (taxId === undefined) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.MISSING_PARAM, fieldName: "taxId" });
    }

    // Check if preperationTime is present
    if (preperationTime === undefined) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.MISSING_PARAM, fieldName: "preperationTime" });
    }

    // VALIDATE Name is correct
    if (typeof name !== 'string' || name.length < 5 || name.length > 50) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "name" });
    }

    // CHECK IF PRODUCT ID STARTS WITH BEV|BUR|SAND and ends with digit (Example: BEV01| SAND21) 
    if (typeof productId !== 'string' || productId.length < 4 || productId.length > 10 || productId.match("\\d$") === null || !(productId.startsWith(_constants.Constants.productIds.BEVERAGE) || productId.startsWith(_constants.Constants.productIds.BURGER) || productId.startsWith(_constants.Constants.productIds.SANDWICH))) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "productId" });
    }

    // CHECK IF TYPE IS STRING OR OPTION IS VEG|NONVEG
    if (typeof type !== 'string' || ![_constants.Constants.type.VEGETARIAN, _constants.Constants.type.NONVEGETARIAN].includes(type)) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "type" });
    }

    // CHECK IF CATEGORY IS STRING OR INCLUDE BEVERAGE, SANDWICH OR BURGERS ONLY
    if (typeof category !== 'string' || ![_constants.Constants.category.BEVERAGE, _constants.Constants.category.BURGER, _constants.Constants.category.SANDWICH].includes(category)) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "category" });
    }

    // VALIDATE IF COST IS NUMBER 
    if (isNaN(cost)) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "cost" });
    }

    // VALIDATE IF TAX ID EXIST IN DB
    if (typeof taxId !== 'string') {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "taxId" });
    }

    // VALIDATE IF PREPERATION time is valid
    if (isNaN(preperationTime) || preperationTime > 30 || preperationTime < 0) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "preperationTime" });
    }

    // check if discount percent is number
    if (discountPercent && isNaN(discountPercent)) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "discountPercent" });
    }

    // validate if offer is correct product id added is exist with valid discount or free value
    if (offers && !(0, _productsService.validOffers)(offers)) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "offer" });
    }

    // create new product
    return _taxSchema.Taxes.findByTaxId(taxId).then(function (response) {
        if (!response) {
            return _promise2.default.reject(_customApiErrors.CustomErrorCode.INVALID_TAX_ID);
        }
        if (offers) {
            return (0, _productsService.validOffers)(offers);
        };
        return _promise2.default.resolve();
    }).then(function (res) {
        if (res === false) {
            return _promise2.default.reject(_customApiErrors.CustomErrorCode.INVALID_OFFERS);
        }
        // create new product object
        var product = new _productsSchema.Products();
        product.name = name;
        product.productId = productId;
        product.type = type;
        product.category = category;
        product.cost = cost;
        product.taxId = taxId;
        product.preperationTime = preperationTime;
        if (discountPercent) {
            product.discountPercent = discountPercent;
        }
        if (offers) {
            product.offers = offers;
        }
        return _productsSchema.Products.createProduct(product);
    }).then(function (product) {
        return res.status(_constants.HttpStatus.OK).send(product);
    }).catch(function (error) {
        return res.status(error.httpstatus).send(error);
    });
};

/**
 * Get all products
 * @returns {Object} - product
 */
/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Controller function of products api
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var getProducts = exports.getProducts = function getProducts(req, res) {
    return _productsSchema.Products.findAll().then(function (product) {
        return res.status(_constants.HttpStatus.OK).send(product);
    }).catch(function (error) {
        return _promise2.default.reject(error);
    });
};