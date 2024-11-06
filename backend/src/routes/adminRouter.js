import express from 'express';
import authUser from '../middlewares/authUser.js';
import authAdmin from '../middlewares/authAdmin.js';
import listAllUsersController from '../controllers/admin/listAllUsersController.js';
import toggleUserStatusController from '../controllers/admin/toggleUserStatusController.js';
import deleteUserController from '../controllers/admin/deleteUserController.js';

//Creamos un router.
export const adminRouter = express.Router();

// ruta de administrador para listar todos los usuarios que actualmente hay en la base de datos
adminRouter.get('/admin/users', authUser, authAdmin, listAllUsersController);

// ruta de administrador para toglear le estado de los usuarios de enable 1 a 0 y viceversa
adminRouter.patch(
  '/admin/:id/status',
  authUser,
  authAdmin,
  toggleUserStatusController
);

// ruta de administrado para borrar un un usuario especifico. he has been naughty
adminRouter.delete('/admin/:id', authUser, authAdmin, deleteUserController);
