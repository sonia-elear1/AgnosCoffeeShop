/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Services used for products apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import { Offers } from "../../schema/offers-schema";
import { Taxes } from "../../schema/tax-schema";
import { Constants } from "../../utils/constants";
import { validProductId } from "../products/products-service"

/**
 * Validate if product id exist 
 * @param {String[]} productIds 
 * @returns {Object[]} products
 */
export const validateProductId = async (productIds) => {
    let products = []
    for (let ids = 0; ids < productIds.length; ids++) {
        let validProduct = await validProductId(productIds[ids])
        products.push(validProduct);
        if (!validProduct) {
            return false;
        }
    }
    return products;
}

/**
 * Calculated estimated time
 * @param {*} products 
 * @returns {Number} - estimated time
 */
export const getEstimatedTime = (products) => {
    let estimatedTime = products.map(value => value.preperationTime);
    return Math.max(...estimatedTime);
}

/**
 * calculate order bill
 * @param {*} products 
 * @returns {Object} - bill generated
 */
export const calculateBill = async (products) => {
    let billGenerated = {}
    let itemTotal = 0, discount = 0, tax = 0;
    let visited = [];
    let productIds = [];
    let freeItemsId = []

    for (let product = 0; product < products.length; product++) {
        visited[product] = false;
        productIds.push(products[product].productId);
    }

    for (let pId = 0; pId < products.length; pId++) {
        itemTotal += products[pId].cost;
        //  check for visited, if false then proceed otherwise skip
        if (visited[pId] === false) {
            let offeredProduct = await getOfferProductById(products[pId].productId);
            let productTax = await getEstimatedTax(products[pId].taxId);
            visited[pId] = true;
            // check for offers applicable for the current product
            if (offeredProduct) {
                const offeredProductId = offeredProduct.offerProductId
                // if offer exists check for type of offer e.g. free or discount type        
                if (offeredProduct.type === Constants.discountType.FREE) {
                    tax += +((productTax / 100) * products[pId].cost).toFixed(2)
                    freeItemsId.push(offeredProductId)
                } else {
                    const idx = productIds.indexOf(offeredProductId);
                    let offeredProductTax;
                    if (idx !== -1) {
                        visited[idx] = true;
                        offeredProductTax = await getEstimatedTax(products[idx].taxId)
                        if (offeredProduct.type === Constants.discountType.FIXED) {
                            discount += offeredProduct.value;
                            tax += +((productTax / 100) * (products[pId].cost - offeredProduct.value)).toFixed(2)
                        }
                        else {
                            let d1 = +((offeredProduct.value / 100) * products[pId].cost).toFixed(2)
                            let d2 = +((offeredProduct.value / 100) * products[idx].cost).toFixed(2)
                            discount = discount + d1 + d2
                            tax += +((productTax / 100) * (products[pId].cost - d1)).toFixed(2)
                            tax += +((offeredProductTax / 100) * (products[idx].cost - d2)).toFixed(2)
                        }
                    }
                }
            }
            else {
                tax += +((productTax / 100) * products[pId].cost).toFixed(2)
            }
        }
    }
    let totalAmount = (itemTotal - discount) + tax;
    billGenerated = {
        itemTotal,
        discount,
        tax,
        totalAmount
    }
    return { billGenerated, freeItemsId }
}

const getEstimatedTax = (taxId) => {
    return Taxes.findByTaxId(taxId).then((response) => {
        return response.taxPercent;
    }).catch((err) => {
        return Promise.reject(err);
    })
}

const getOfferProductById = (productId) => {
    return Offers.findByProductId(productId).then((response) => {
        return response;
    }).catch((err) => {
        return Promise.reject(err)
    })
}