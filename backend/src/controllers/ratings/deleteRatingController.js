import deleteRatingService from '../../services/ratings/deleteRatingsService.js';

const deleteRatingController = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;
    await deleteRatingService(id, userId, rating, comment);
    res.status(200).json({ message: 'Valoración eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la valoración:', error);
    res.status(500).json({ message: 'Error al eliminar la valoración' });
  }
};

export default deleteRatingController;
