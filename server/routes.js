/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes and its configuration
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

import productRouter from './api/products';
import ordersRouter from './api/orders';
import taxRouter from './api/tax';
import userRouter from './api/users';
import { HttpStatus } from './utils/custom-api-errors';

// Routes function to load apis on specific routes
export default (app) => {

  app.use('/v1/agnos-product', productRouter);
  app.use('/v1/agnos-orders', ordersRouter);
  app.use('/v1/agnos-tax', taxRouter);
  app.use('/v1/agnos-users', userRouter);

  app.get('*', (req, res) => {
    return res.status(HttpStatus.NOT_FOUND).send('Page not found');
  });
};