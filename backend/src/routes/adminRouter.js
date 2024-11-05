import express from 'express';
import authUser from '../middlewares/authUser.js';
import authAdmin from '../middlewares/authAdmin.js';
import listAllUsersController from '../controllers/admin/listAllUsersController.js';

//Creamos un router.
export const adminRouter = express.Router();

adminRouter.get('/admin/users', authUser, authAdmin, listAllUsersController);
