import crypto from 'crypto';

//Importamos los servicios.
import { insertUserService } from '../services/users/insertUserService.js';

export const newUserController = async (req, res, next) => {
  try {
    //Obtenemos el body de la petición
    const { username, email, password, firstname, lastname, avatar } = req.body;

    //Creamos la uuid para el código de registro.
    const registrationCode = crypto.randomUUID();

    //Insertamos el usuario en la base de datos.
    await insertUserService(username, email, password, firstname, lastname, avatar, registrationCode);

    //Respondemos al cliente
    res.status(201).send({
      status: 'ok',
      message: 'Usuario registrado correctamente',
      data: { registrationCode },
    });
  } catch (error) {
    next(error);
  }
};