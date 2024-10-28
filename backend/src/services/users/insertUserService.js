import bcrypt from 'bcrypt';
import joi from 'joi';

import getPool from '../../db/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const userSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().min(8).required(),
  nombre: joi.string().max(50).required(),
  apellidos: joi.string().max(50).required(),
  avatar: joi.string().uri().optional(),
  registrationCode: joi.string().max(100)
});


export const insertUserService = async ( 
  email,
  username,
  password,
  nombre,
  apellidos,
  avatar,
  registrationCode
) => {
  try {
    //Validamos los datos de entrada.
    const { error } =userSchema.validate({ email, username, password, nombre, apellidos, avatar,registrationCode});
    if(error){
      throw generateErrorsUtils(`Error de validación: ${error.details[0].message}`, 400);
    }
    // Obtenemos la conexión con la base de datos.
    const pool = await getPool();
    //Comprobamos si existe el usuario previamente.
    const [userExists] = await pool.query(
      'SELECT * FROM usuarios WHERE email=?',
      [email]
    );
    if (userExists.length > 0) {
    throw generateErrorsUtils('El usuario ya está registrado', 409);
    }
    // Hasheamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    //Insertamos el usuario en la base de datos.
    const [result] = await pool.query(
      `
            INSERT INTO usuarios(email, username, password, nombre, apellidos, avatar, registrationCode) VALUES(?,?,?,?,?,?,?)
            `,
      [
        email,
        username,
        hashedPass,
        nombre,
        apellidos,
        avatar, 
        registrationCode
      ]
    );
    console.log('Usuario guardado en la base de datos', result);
  } catch (error) {
    //Manejamos el error
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
};
