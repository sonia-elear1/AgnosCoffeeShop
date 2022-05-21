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
import { HttpStatus } from './utils/constants';

// Routes function to load apis on specific routes
export default (app) => {

  app.use('/v1/agnos-products', productRouter);
  app.use('/v1/agnos-orders', ordersRouter);

  app.get('*', (req, res) => {
    return res.status(HttpStatus.NOT_FOUND).send('Page not found');
  });
};