import express from 'express';
import getRatingsController from '../controllers/ratings/getRatingsController.js';
import postRatingController from '../controllers/ratings/postRatingsController.js';
import updateRating from '../controllers/ratings/putRatingsController.js';
import authUser from '../middlewares/authUser.js';

const ratingsRouter = express.Router();

// Endpoint para obtener todas las valoraciones (para cualquier usuario).
ratingsRouter.get('/ratings', getRatingsController);

// Endpoint para crear una nueva valoración (requiere autenticación).
ratingsRouter.post('/ratings', authUser, postRatingController);

// Endpoint para editar una valoración existente (requiere autenticación).
ratingsRouter.put('/ratings/:id', authUser, updateRating);

export default ratingsRouter;