'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _usersController = require('./users-controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes of users api
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/
var userRouter = _express2.default.Router();

userRouter.post('/', _usersController.createUser);
userRouter.get('/:id', _usersController.getUser);

module.exports = userRouter;