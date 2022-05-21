'use strict';

var _productsController = require('./products-controller');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes ofproduct apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var productRouter = _express2.default.Router();

productRouter.post('/', _productsController.createProduct);
productRouter.get('/:id', _productsController.getProduct);
productRouter.put('/:id', _productsController.updateProduct);
productRouter.delete('/:id', _productsController.deleteProduct);

module.exports = productRouter;