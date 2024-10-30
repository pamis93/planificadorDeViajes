import insertFavoriteFlightService from '../../services/flights/insertFavoriteFlightService.js';

const newFavoriteFlightController = async (req, res, next) => {
  try {
    // sacamos del body la información que queremos meter en la base de datos
    // en nuestro caso según la base de datos que hizo Alejandro requerimos lo siguiente:
    const {origin, destination, departureDate, arrivalDate, aeroline, price, duration, note} =req.body;

    // extraemos el id de la request, para ello el usuario tiene que estar logeado
    const user_id = req.user.id;

    const favorite = await insertFavoriteFlightService(
      origin,
      destination,
      departureDate,
      arrivalDate,
      aeroline,
      price,
      duration,
      note,
      user_id
    );

    res.send({
      status: 'ok',
      message: 'Vuelo guardado como favorito',
      data: {
        favorite,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default newFavoriteFlightController;