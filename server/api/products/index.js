/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes ofproduct apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import { createProduct, getProducts } from "./products-controller";
import express from 'express';

const productRouter = express.Router();

// CREATE NEW PRODUCT
productRouter.post('/', createProduct);

// GET PRODUCT BY PRODUCTID
productRouter.get('/', getProducts);

module.exports = productRouter;