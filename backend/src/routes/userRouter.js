import express from 'express';
import { newUserController } from '../controllers/newUserController.js';
import loginUserController from '../controllers/loginUserController.js';
import { validateUserController } from '../controllers/validateUserController.js'
import recoverPasswordController from '../controllers/recoverPasswordController.js';
// import { editUserPasswordController } from '../controllers/editUserPasswordControllers.js';



//Creamos un router.
export const userRouter = express.Router();

//Endpoint de registro de un nuevo usuario.
userRouter.post('/users/register', newUserController);

// Endpoint de validación de usuario
userRouter.get('/users/validate/:registrationCode', validateUserController);

// endpoint de login del usuario
userRouter.get('/users/login', loginUserController);

// Endpoint cambio de contraseña
// userRouter.put('/users/password', editUserPasswordController);

//Endpoint recuperacion de contraseña
userRouter.post('/users/password/recover', recoverPasswordController)