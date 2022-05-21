/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains user schema of visitors in coffee
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import mongoose from 'mongoose';
import { CustomApiError, HttpStatus } from '../utils/custom-api-errors'
import Constants from '../utils/constants';

let Schema = mongoose.Schema;

let UsersSchema = new Schema({
    "firstName": { type: String, minLength: 4, maxLength: 50, required: true },
    "lastName": { type: String, minLength: 4, maxLength: 50 },
    "contactNumber": { type: Number, minLength: 10, maxLength: 10, required: true },
    "validUser": { type: Boolean, default: false },
    "createdAt": { type: Date, default: Date.now },
    "updatedAt": { type: Date, default: Date.now }
})

// create index on collection to have unique contact number
UsersSchema.index({ "contactNumber": 1 }, { unique: true });

UsersSchema.static = {

};

export const Users = mongoose.model('Users', UsersSchema, 'Users');