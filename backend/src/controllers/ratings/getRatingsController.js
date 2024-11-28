import getRatingsService from '../../services/ratings/getRatingsService.js';

const getRatingsController = async (req, res) => {
  try {
    const { averageRating, ratings, numVotes } = await getRatingsService();

    if (ratings.length > 0) {
      return res.json({
        status: 'ok',
        averageRating,
        data: ratings,
        averageRating,
        numVotes,
      });
    } else {
      return res.json({
        status: 'ok',
        averageRating, // Si no hay valoraciones, el promedio es 0
        data: [],
        message: 'No se encontraron valoraciones',
      });
    }
  } catch (error) {
    console.error('Error al obtener las valoraciones:', error);
    res.status(500).json({
      status: 'error',
      message: 'Hubo un problema al obtener las valoraciones',
    });
  }
};

export default getRatingsController;
