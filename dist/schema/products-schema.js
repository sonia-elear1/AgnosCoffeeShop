'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Products = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _customApiErrors = require('../utils/custom-api-errors');

var _constants = require('../utils/constants');

var _constants2 = _interopRequireDefault(_constants);

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
        enum: [_constants2.default.type.VEGETARIAN, _constants2.default.type.NONVEGETARIAN],
        default: _constants2.default.type.VEGETARIAN
    },
    "category": {
        type: String,
        enum: [_constants2.default.category.BURGER, _constants2.default.category.SANDWICH, _constants2.default.category.BEVERAGE],
        required: true
    },
    "cost": { type: _mongoose2.default.Types.Decimal128, default: 0.0 },
    "discount": { type: _mongoose2.default.Types.Decimal128, default: 0.0 },
    "taxRate": { type: String, ref: 'Tax' },
    "preperationTime": { type: Number, default: 10 },
    "offers": [{
        "productId": { type: String, minLength: 4, maxLength: 10 },
        "discount": { type: _mongoose2.default.Types.Decimal128, default: 0.0 },
        "free": { type: Boolean, default: false }
    }],
    "createdAt": { type: Date, default: Date.now }
});

// create index on collection to have unique productId
ProductsSchema.index({ "productId": 1 }, { unique: true });

ProductsSchema.statics = {};

var Products = exports.Products = _mongoose2.default.model('Products', ProductsSchema, 'Products');