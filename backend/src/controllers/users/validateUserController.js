import { updateUserRegCodeService } from '../../services/users/updateUserRegCodeService.js';

export const validateUserController = async (req, res, next) => {
  try {
    const { registrationCode } = req.params;

    await updateUserRegCodeService(registrationCode);

    //esto asegura que siempre se devolvera un json.
    res.status(200).json({
      status: 'ok',
      message: 'Usuario activado!',
    });
  } catch (error) {
    next(error);
  }
};


