// librerías y dependencias
import express from 'express';

// controladores

// middlewares
import authUser from '../middlewares/authUser.js';
import newFavoriteFlightController from '../controllers/newFavoriteFlightController.js';

// router
export const flightRouter = express.Router();

// Rutas

// ruta para marcar un vuelo como favorito con posibilidad de crear una nota
flightRouter.post('/flights/favoritos', authUser, newFavoriteFlightController);
