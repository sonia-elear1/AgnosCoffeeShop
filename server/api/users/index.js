/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains routes of users api
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/
import express from 'express';
import { createUser, getUser } from './users-controller';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/:id', getUser);

module.exports = userRouter;