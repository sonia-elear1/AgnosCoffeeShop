'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Users = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _customApiErrors = require('../utils/custom-api-errors');

var _constants = require('../utils/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; /*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains user schema of visitors in coffee
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var UsersSchema = new Schema({
    "firstName": { type: String, minLength: 4, maxLength: 50, required: true },
    "lastName": { type: String, minLength: 4, maxLength: 50 },
    "contactNumber": { type: String, minLength: 10, maxLength: 10, required: true },
    "createdAt": { type: Date, default: Date.now },
    "updatedAt": { type: Date, default: Date.now }
});

// create index on collection to have unique contact number
UsersSchema.index({ "contactNumber": 1 }, { unique: true });

UsersSchema.statics = {

    /**
    * Finds the document based on contact number
    * @param  {String} contactNumber - contact number
    * @returns {Object} userDetail
    */
    findByContactNumber: function findByContactNumber(contactNumber) {
        var _this = this;

        return new _promise2.default(function (resolve, reject) {
            _this.findOne({ contactNumber: contactNumber }, function (err, userData) {
                if (err) {
                    console.error('findByContactNumber: Error occured in users collection', err);
                    reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
                } else {
                    resolve(userData);
                }
            });
        });
    },


    /**
     * Create user
     * @param {Object} user 
     * @returns user
     */
    createUser: function createUser(user) {
        return new _promise2.default(function (resolve, reject) {
            user.save(function (err, document) {
                if (err) {
                    console.error('createUser: Error occurred in creating\n            user', err);
                    reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
                }
                return resolve(document);
            });
        });
    },


    /**'
     * Find by id
     */
    findByuserId: function findByuserId(ids) {
        var _this2 = this;

        return new _promise2.default(function (resolve, reject) {
            _this2.find({ _id: { $in: ids } }, function (err, userData) {
                if (err) {
                    console.error('findByContactNumber: Error occured in users collection', err);
                    reject(new Error(_customApiErrors.CustomErrorCode.INTERNAL_SERVER_ERROR));
                } else {
                    resolve(userData);
                }
            });
        });
    }
};

var Users = exports.Users = _mongoose2.default.model('Users', UsersSchema, 'users');