import { getUserRating, addRating } from '../../services/ratings/postRatingService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

//hacer nueva valoracion 
const postRatingController = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        status: 'error',
        message: 'La valoración debe ser un número entre 1 y 5',
      });
    }

    // Verificar si un usuario ya tiene una valoración
    const existingRating = await getUserRating(userId);
    if (existingRating.length > 0) {
      throw generateErrorsUtils('El usuario ya ha realizado una valoración', 403);
    }

    await addRating(userId, rating, comment);
    return res.status(201).json({
      status: 'ok',
      message: 'Valoración añadida correctamente',
    });
  } catch (error) {
    console.error('Error al agregar la valoración:', error);
    res.status(500).json({
      status: 'error',
      message: 'Hubo un problema al agregar la valoración',
    });
  }
};

export default postRatingController;

