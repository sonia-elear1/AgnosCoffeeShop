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

// create new order
ordersRouter.post('/', createOrder);

// get order by order id
ordersRouter.get('/:id', getOrder);
 
// update order status and send message to respective numbers
ordersRouter.put('/', updateOrderStatus);

module.exports = ordersRouter;