import express from 'express';
import { newUserController } from '../controllers/newUserController.js';

//Creamos un router.
export const userRouter = express.Router();

//Endpoint de registro de un nuevo usuario.
userRouter.post('/users/register', newUserController);