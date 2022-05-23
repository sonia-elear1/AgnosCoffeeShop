/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains user schema of visitors in coffee
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import mongoose from 'mongoose';
import { CustomErrorCode } from '../utils/custom-api-errors'
import Constants from '../utils/constants';

let Schema = mongoose.Schema;

let UsersSchema = new Schema({
    "firstName": { type: String, minLength: 4, maxLength: 50, required: true },
    "lastName": { type: String, minLength: 4, maxLength: 50 },
    "contactNumber": { type: String, minLength: 10, maxLength: 10, required: true },
    "createdAt": { type: Date, default: Date.now },
    "updatedAt": { type: Date, default: Date.now }
})

// create index on collection to have unique contact number
UsersSchema.index({ "contactNumber": 1 }, { unique: true });

UsersSchema.statics = {

    /**
    * Finds the document based on contact number
    * @param  {String} contactNumber - contact number
    * @returns {Object} userDetail
    */
    findByContactNumber(contactNumber) {
        return new Promise((resolve, reject) => {
            this.findOne({ contactNumber }, (err, userData) => {
                if (err) {
                    console.error('findByContactNumber: Error occured in users collection', err);
                    reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
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
    createUser(user) {
        return new Promise((resolve, reject) => {
            user.save((err, document) => {
                if (err) {
                    console.error(`createUser: Error occurred in creating
            user`, err);
                    reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
                }
                return resolve(document);
            });
        });
    },

    /**'
     * Find by id
     */
    findByuserId(ids) {
        return new Promise((resolve, reject) => {
            this.find({ _id: { $in: ids } }, (err, userData) => {
                if (err) {
                    console.error('findByContactNumber: Error occured in users collection', err);
                    reject(new Error(CustomErrorCode.INTERNAL_SERVER_ERROR));
                } else {
                    resolve(userData);
                }
            });
        });
    },
};

export const Users = mongoose.model('Users', UsersSchema, 'users');