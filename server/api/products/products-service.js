/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Services used for products apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import { Products } from "../../schema/products-schema";
import { Taxes } from "../../schema/tax-schema"

/**
 * Check offers passed is valid or not
 * @param {Object[]} offers - offers array
 * @return Boolean: valid offer or not
 */
export const validOffers = async (offers) => {
    for (let offer = 0; offer < offers.length; offer++) {
        let checkValid = await validProductId(offers[offer].productId);
        if (!checkValid || (offers[offer].discount && isNaN(offers[offer].discount))
            || (offers[offer].free && typeof (free) !== 'boolean')) {
            return false;
        }
    }
    return true;
}

/**
 * Check product id is valid
 * @param {String} productId 
 * @returns Boolean : valid / not valid
 */
export const validProductId = (productId) => {
    return Products.findByProductId(productId).then((response) => {
        if (!response) {
            return false;
        }
        return true;
    }).catch((error) => {
        return Promise.reject(error)
    });
}

/**
 * Check if tax id exist in record
 * @param {String} taxId 
 * @returns Boolean: true/false
 */
export const checkTaxIdExist = (taxId) => {

    return Taxes.findByTaxId(taxId).then((response) => {
        if (!response) {
            return false;
        }
        return true;
    }).catch((err) => {
        Promise.reject(err);
    })
}