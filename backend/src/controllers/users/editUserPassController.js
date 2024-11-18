import joi from 'joi';
import { updateUserPassService } from '../../services/users/updateUserPassService.js'
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const newPassSchema = joi.object({
 newPassword: joi.string().min(8).required() 
})

export const editUserPassController = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    //Validamos los datos de entrada.
    const { error } =newPassSchema.validate({ newPassword });
    if(error){
      throw generateErrorsUtils(`Error al introducir los datos: ${error.details[0].message}`, 400);
    }

    await updateUserPassService(email, newPassword);

    res.send({
      status: "ok",
      message: "Contraseña actualizada",
    }); 
  } catch (error) {
    next(error);
  }
};