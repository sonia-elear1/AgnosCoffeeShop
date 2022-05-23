'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Offers = undefined;

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

var OffersSchema = new Schema({
    "productId": { type: String, minLength: 4, maxLength: 10 },
    "offerProductId": { type: String, minLength: 4, maxLength: 10 },
    "value": { type: Number, default: 0.0 },
    "type": { type: String, enum: [_constants.Constants.discountType.FREE, _constants.Constants.discountType.FIXED, _constants.Constants.discountType.PERCENT], default: _constants.Constants.discountType.FIXED },
    "createdAt": { type: Date, default: Date.now }
});

OffersSchema.statics = {

    /**
    * Finds the offer based on product id
    * @param  {String} productId - product id
    * @returns {Object} productdetails
    */
    findByProductId: function findByProductId(productId) {
        var _this = this;

        return new _promise2.default(function (resolve, reject) {
            _this.findOne({ productId: productId }, function (err, offerProduct) {
                if (err) {
                    console.error('findByProductId: Error occured in product collection', err);
                    reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
                } else {
                    resolve(offerProduct);
                }
            });
        });
    }
};

var Offers = exports.Offers = _mongoose2.default.model('Offers', OffersSchema, 'offers');