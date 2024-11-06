import joi from 'joi';

import { updateUserService } from '../../services/users/updateUserService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const editUserSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().alphanum().min(3).max(30).required(),
});
export const editUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { email, username } = req.body;

    //Validamos el body
    const { error } = editUserSchema.validate({ email, username });
    if (error) {
      throw generateErrorsUtils(
        `Datos inválidos: ${error.details[0].message}`,
        400
      );
    }

    //Verificamos que el usuario es el propietario de los datos a modificar
    if (userId != req.user.id)
      throw generateErrorsUtils('Acción denegada', 409);

    await updateUserService(email, username, userId);

    res.send({
      status: 'ok',
      message: 'Datos actualizados correctamente',
    });
  } catch (error) {
    next(error);
  }
};
