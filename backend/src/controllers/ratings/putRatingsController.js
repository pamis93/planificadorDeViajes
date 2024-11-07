import { getRatingByIdAndUser, updateRating } from '../../services/ratings/putRatingsServices.js';

const putRatingController = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        status: 'error',
        message: 'La valoración debe ser un número entre 1 y 5',
      });
    }

    const existingRating = await getRatingByIdAndUser(id, userId);
    if (existingRating.length === 0) {
      return res.status(403).json({
        status: 'error',
        message: 'No tienes autorización para editar este comentario o no existe',
      });
    }

    await updateRating(id, userId, rating, comment);
    return res.status(200).json({
      status: 'ok',
      message: 'Valoración actualizada correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar la valoración:', error);
    res.status(500).json({
      status: 'error',
      message: 'Hubo un problema al actualizar la valoración',
    });
  }
};

export default putRatingController;
