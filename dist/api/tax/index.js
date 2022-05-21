'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _taxController = require('./tax-controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes of tax apis
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var taxRouter = _express2.default.Router();

taxRouter.post('/', _taxController.createTax);
taxRouter.put('/:taxId', _taxController.updateTax);

module.exports = taxRouter;