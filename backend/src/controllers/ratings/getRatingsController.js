import getRatingsService from '../../services/ratings/getRatingsService.js';



//para obtener todos las valoraciones 
const getRatingsController = async (req, res) => {
  try {
    const ratings = await getRatingsService();
    return res.json({
      status: 'ok',
      data: ratings,
    });
  } catch (error) {
    console.error('Error al obtener las valoraciones:', error);
    res.status(500).json({
      status: 'error',
      message: 'Hubo un problema al obtener las valoraciones',
    });
  }
};

export default getRatingsController;