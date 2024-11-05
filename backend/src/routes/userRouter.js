import express from 'express';
import { newUserController } from '../controllers/users/newUserController.js';
import loginUserController from '../controllers/users/loginUserController.js';
import { validateUserController } from '../controllers/users/validateUserController.js';
import recoverPasswordController from '../controllers/users/recoverPasswordController.js';
import { editUserPassController } from '../controllers/users/editUserPassController.js';
import favoritosController from '../controllers/users/favoritosController.js';
import authUser from '../middlewares/authUser.js';
import newFavoriteFlightController from '../controllers/flights/newFavoriteFlightController.js';
import { editUserAvatarController } from '../controllers/users/editUserAvatarController.js';

//Creamos un router.
export const userRouter = express.Router();

//Endpoint de registro de un nuevo usuario.
userRouter.post('/users/register', newUserController);

// Endpoint de validación de usuario
userRouter.get('/users/validate/:registrationCode', validateUserController);

// endpoint de login del usuario
userRouter.get('/users/login', loginUserController);

// Endpoint cambio de contraseña
userRouter.put('/users/password', editUserPassController);

//Endpoint recuperacion de contraseña
userRouter.post('/users/password/recover', recoverPasswordController);

//Endpoint cambio de Avatar
userRouter.put("/users/avatar", authUser, editUserAvatarController);

//PREGUNTAR POSICIÓN CORRECTA DE ESTOS DOS ENDPOINT:

//Endpoint lista favoritos
userRouter.get('/users/:usuario_id/favoritos', authUser, favoritosController);

//prueba addFav
userRouter.post('/users/favorite', authUser, newFavoriteFlightController);
