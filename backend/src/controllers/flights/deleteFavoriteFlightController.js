// importar el servicio

import deleteFavoriteFlightService from '../../services/flights/deleteFavoriteFlightService.js';

const deleteFavoriteFlightController = async (req, res, next) => {
  try {
    const { flightId } = req.params;

    const response = await deleteFavoriteFlightService(flightId);

    res.send({
      status: 'ok',
      message: `Vuelo ${flightId} fue borrado con éxito`,
      data: {
        response,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default deleteFavoriteFlightController;
