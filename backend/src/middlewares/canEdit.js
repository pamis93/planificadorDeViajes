import selectFavoriteFlightByIdService from '../services/flights/selectFavoriteFlightByIdService.js';
import generateErrorsUtils from '../utils/generateErrorsUtils.js';

const canEdit = async (req, res, next) => {
  try {
    const { flightId } = req.params;

    const favorito = await selectFavoriteFlightByIdService(flightId);

    console.log('favorito es', favorito);
    console.log('id es', req.user.id);

    if (favorito.user_id !== req.user.id)
      throw generateErrorsUtils('No puedes realizar esta operación', 409);

    next();
  } catch (error) {
    next(error);
  }
};

export default canEdit;
