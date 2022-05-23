/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Controller function of products api
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import { Products } from "../../schema/products-schema";
import { Constants, HttpStatus } from "../../utils/constants";
import { CustomErrorCode } from "../../utils/custom-api-errors";
import { Taxes } from "../../schema/tax-schema"

/**
 * Create new Product
 * @param {String} name - req.body.name
 * @param {String} productId - req.body.productId
 * @param {String} type - req.body.type
 * @param {String} category - req.body.category
 * @param {String} cost - req.body.cost
 * @param {String} taxId - req.body.taxId
 * @param {String} preperationTime - req.body.preperationTime
 * @returns {Object} - created product
 */
export const createProduct = (req, res) => {
    let name = req.body.name;
    let productId = req.body.productId;
    let type = req.body.type;
    let category = req.body.category;
    let cost = req.body.cost;
    let taxId = req.body.taxId;
    let preperationTime = req.body.preperationTime;

    // Check if name is present
    if (name === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.MISSING_PARAM, fieldName: "name" });
    }

    // Check if productId is present
    if (productId === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.MISSING_PARAM, fieldName: "productId" });
    }
    // Check if type is present
    if (type === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.MISSING_PARAM, fieldName: "type" });
    }

    // Check if category is present
    if (category === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.MISSING_PARAM, fieldName: "category" });
    }

    // Check if cost is present
    if (cost === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.MISSING_PARAM, fieldName: "cost" });
    }

    // Check if taxId is present
    if (taxId === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.MISSING_PARAM, fieldName: "taxId" });
    }

    // Check if preperationTime is present
    if (preperationTime === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.MISSING_PARAM, fieldName: "preperationTime" });
    }

    // VALIDATE Name is correct
    if (typeof (name) !== 'string' || name.length < 5 || name.length > 50) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "name" });
    }

    // CHECK IF PRODUCT ID STARTS WITH BEV|BUR|SAND and ends with digit (Example: BEV01| SAND21) 
    if (typeof (productId) !== 'string' || productId.length < 4 || productId.length > 10 || productId.match("\\d$") === null ||
        !(productId.startsWith(Constants.productIds.BEVERAGE) || productId.startsWith(Constants.productIds.BURGER) || productId.startsWith(Constants.productIds.SANDWICH))) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "productId" });
    }

    // CHECK IF TYPE IS STRING OR OPTION IS VEG|NONVEG
    if (typeof (type) !== 'string' || !([Constants.type.VEGETARIAN, Constants.type.NONVEGETARIAN].includes(type))) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "type" });
    }

    // CHECK IF CATEGORY IS STRING OR INCLUDE BEVERAGE, SANDWICH OR BURGERS ONLY
    if (typeof (category) !== 'string' ||
        !([Constants.category.BEVERAGE, Constants.category.BURGER, Constants.category.SANDWICH].includes(category))) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "category" });
    }

    // VALIDATE IF COST IS NUMBER 
    if (isNaN(cost)) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "cost" });
    }

    // VALIDATE IF TAX ID EXIST IN DB
    if (typeof (taxId) !== 'string') {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "taxId" });
    }

    // VALIDATE IF PREPERATION time is valid
    if (isNaN(preperationTime) || preperationTime > 30 || preperationTime < 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "preperationTime" });
    }

    // check if tax id is present
    return Taxes.findByTaxId(taxId)
        .then((response) => {
            if (!response) {
                return Promise.reject(CustomErrorCode.INVALID_TAX_ID)
            }
            return Promise.resolve();
        }).then((res) => {
            if (res === false) {
                return Promise.reject(CustomErrorCode.INVALID_OFFERS)
            }
            // create new product object
            let product = new Products();
            product.name = name;
            product.productId = productId;
            product.type = type;
            product.category = category;
            product.cost = cost;
            product.taxId = taxId;
            product.preperationTime = preperationTime;
            return Products.createProduct(product);
        }).then((product) => {
            return res.status(HttpStatus.OK).send(product);
        }).catch((error) => {
            return res.status(error.httpstatus).send(error);
        });
};

/**
 * Get all products
 * @returns {Object} - product
 */
export const getProducts = (req, res) => {
    return Products.findAll().then((product) => {
        return res.status(HttpStatus.OK).send(product);
    }).catch((error) => {
        return Promise.reject(error);
    })
};

