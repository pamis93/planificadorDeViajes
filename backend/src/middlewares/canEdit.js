import generateErrorsUtils from '../utils/generateErrorsUtils';

const canEdit = async (req, res, next) => {
  try {
    const { flightId } = req.params;

    const favorito = await selectFavoriteFlightByIdService(flightId);

    if (favorito.usuario_id !== req.user.id)
      throw generateErrorsUtils('No puedes realizar esta operación', 409);

    next();
  } catch (error) {
    next(error);
  }
};

export default canEdit;
