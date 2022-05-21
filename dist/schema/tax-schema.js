'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tax = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _customApiErrors = require('../utils/custom-api-errors');

var _constants = require('../utils/constants');

var _constants2 = _interopRequireDefault(_constants);

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
    "taxId": { type: String, minLength: 4, maxLength: 10, required: true },
    "taxType": {
        type: String,
        enum: [_constants2.default.category.BURGER, _constants2.default.category.SANDWICH, _constants2.default.category.BEVERAGE],
        required: true
    },
    "taxPercent": { type: _mongoose2.default.Types.Decimal128, default: 0.0 }
}, { _id: false });

TaxSchema.static = {};

var Tax = exports.Tax = _mongoose2.default.model('Tax', TaxSchema, 'Tax');