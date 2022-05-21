/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes ofproduct apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import { createProduct, deleteProduct, getProduct, updateProduct } from "./products-controller";
import express from 'express';

const productRouter = express.Router();

productRouter.post('/', createProduct);
productRouter.get('/:id', getProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter;