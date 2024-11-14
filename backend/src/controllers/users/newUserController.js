import crypto from 'crypto';
import joi from 'joi';
//Importamos los servicios.
import { insertUserService } from '../../services/users/insertUserService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const userSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().min(8).required(),
  name: joi.string().max(50).required(),
  lastName: joi.string().max(50).required(),
  registrationCode: joi.string().max(100)
});
export const newUserController = async (req, res, next) => {
  try {
    //Obtenemos el body de la petición
    const { email, username, password, name, lastName } = req.body;

    //Creamos la uuid para el código de registro.
    const registrationCode = crypto.randomUUID();

    //Validamos los datos de entrada.
    const { error } = userSchema.validate({ email, username, password, name, lastName,registrationCode});
    if(error){
      throw generateErrorsUtils(`Error de validación: ${error.details[0].message}`, 400);
    }

    //Insertamos el usuario en la base de datos.
    await insertUserService(
      email,
      username,
      password,
      name,
      lastName,
      registrationCode
    );

    //Respondemos al cliente
    res.status(201).send({
      status: 'ok',
      message: 'Usuario registrado correctamente',
    });
  } catch (error) {
    next(error);
  }
};
