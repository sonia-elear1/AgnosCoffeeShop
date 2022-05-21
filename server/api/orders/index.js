/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes of order apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/
import express from 'express';
import { createOrder, getOrder, updateOrderStatus } from './orders-controller';

const ordersRouter = express.Router();

ordersRouter.post('/', createOrder);
ordersRouter.get('/:id', getOrder);
ordersRouter.put('/:id', updateOrderStatus);

module.exports = ordersRouter;