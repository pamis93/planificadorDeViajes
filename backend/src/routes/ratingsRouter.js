import express from 'express';
import ratingsController from '../controllers/ratings/ratingsController.js';
import authUser from '../middlewares/authUser.js';

// Creamos un router.
export const ratingsRouter = express.Router();

// Endpoint para obtener todas las valoraciones (para cualquier usuario).
ratingsRouter.get('/ratings', ratingsController);

// Endpoint para crear una nueva valoración (requiere autenticación).
ratingsRouter.post('/ratings', authUser, ratingsController);

// Endpoint para editar una valoración existente (requiere autenticación).
ratingsRouter.put('/ratings/:id', authUser, ratingsController);



