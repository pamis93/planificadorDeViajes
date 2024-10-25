import bcrypt from 'bcrypt';
import crypto from 'crypto';

import getPool from '../../db/getPool.js';

export const insertUserService = async (
  username,
  email,
  password,
  firstname,
  lastname,
  avatar,
  registrationCode
) => {
  try {
    // Obtenemos la conexión con la base de datos.
    const pool = await getPool();
    //Comprobamos si existe el usuario previamente.
    const [userExists] = await pool.query(
      'SELECT * FROM usuarios WHERE email=?',
      [email]
    );
    if (userExists.lenght > 0) {
      console.log('El usuario ya está registrado');
      return; //salimos de la función si el usuario ya existe.
    }
    // Hasheamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    //Creamos un id para el usuario.
    const userId = crypto.randomUUID();

    //Insertamos el usuario en la base de datos.
    const [result] = await pool.query(
      `
            INSERT INTO usuarios(id, username, email, password, firstName, lastName, avatar, registrationCode) VALUES(?,?,?,?,?,?,?,?)
            `,
      [
        userId,
        username,
        email,
        hashedPass,
        firstname,
        lastname,
        avatar,
        registrationCode,
      ]
    );
    console.log('Usuario guardado en la base de datos', result);
  } catch (error) {
    //Manejamos el error
    console.error('Error al registrar el usuario:', error);
  }
};