'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Users = undefined;

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
    "contactNumber": { type: Number, minLength: 10, maxLength: 10, required: true },
    "validUser": { type: Boolean, default: false },
    "createdAt": { type: Date, default: Date.now },
    "updatedAt": { type: Date, default: Date.now }
});

// create index on collection to have unique contact number
UsersSchema.index({ "contactNumber": 1 }, { unique: true });

UsersSchema.static = {};

var Users = exports.Users = _mongoose2.default.model('Users', UsersSchema, 'Users');