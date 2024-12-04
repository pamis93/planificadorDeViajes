import deleteRatingService from '../../services/ratings/deleteRatingsService.js';

const deleteRatingController = async (req, res) => {
  try {
    const userId = req.user.id;
    await deleteRatingService(userId);
    res.status(200).json({ message: 'Valoración eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la valoración:', error.message);
    res.status(500).json({ message: 'Error al eliminar la valoración' });
  }
};

export default deleteRatingController;
