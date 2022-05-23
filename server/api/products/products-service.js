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
 * Check product id is valid
 * @param {String} productId 
 * @returns Boolean : valid / not valid
 */
export const validProductId = (productId) => {
    return Products.findByProductId(productId).then((response) => {
        if (!response) {
            return false;
        }
        return response;
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