import express from 'express';
import { newUserController } from '../controllers/newUserController.js';
import loginUserController from '../controllers/loginUserController.js';

//Creamos un router.
export const userRouter = express.Router();

//Endpoint de registro de un nuevo usuario.
userRouter.post('/users/register', newUserController);

// endpoint de login del usuario
userRouter.get('/users/login', loginUserController);
