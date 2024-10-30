// importar el servicio

import deleteFavoriteFlight from '../services/flights/deleteFavoriteFlightService';

const deleteFavoriteFlightController = async (req, res, next) => {
  try {
    const { flightId } = req.params;

    const response = await deleteFavoriteFlight(flightId);

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
