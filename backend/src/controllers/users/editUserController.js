import joi from 'joi';

import { updateUserService } from '../../services/users/updateUserService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const editUserSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().alphanum().min(3).max(30).required(),
  name: joi.string().max(50).required(),
  lastName: joi.string().max(50).required(),
});
export const editUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { email, username, name, lastname } = req.body;

    //Validamos el body
    const { error } = editUserSchema.validate({ email, username, name, lastname });
    if (error) {
      throw generateErrorsUtils(
        `Datos inválidos: ${error.details[0].message}`,
        400
      );
    }

    //Verificamos que el usuario es el propietario de los datos a modificar
    if (userId != req.user.id)
      throw generateErrorsUtils('Acción denegada', 409);

    await updateUserService(email, username, name, lastname, userId);

    res.send({
      status: 'ok',
      message: 'Datos actualizados correctamente',
    });
  } catch (error) {
    next(error);
  }
};
