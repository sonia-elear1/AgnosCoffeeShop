/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes of tax apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import express from 'express';
import { createTax, updateTax } from './tax-controller';

const taxRouter = express.Router();

taxRouter.post('/', createTax);
taxRouter.put('/:taxId', updateTax);

module.exports = taxRouter;