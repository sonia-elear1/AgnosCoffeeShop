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

// CREATE NEW PRODUCT
productRouter.post('/', _productsController.createProduct);

// GET PRODUCT BY PRODUCTID
productRouter.get('/', _productsController.getProducts);

module.exports = productRouter;